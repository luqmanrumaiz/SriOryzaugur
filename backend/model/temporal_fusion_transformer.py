import pandas as pd
import numpy as np
import datetime
from dateutil.relativedelta import relativedelta

import lightning.pytorch as pl

from pytorch_forecasting import Baseline, TimeSeriesDataSet, TemporalFusionTransformer
from pytorch_forecasting.data import GroupNormalizer, NaNLabelEncoder
from pytorch_forecasting.metrics import SMAPE, QuantileLoss, RMSE, MAPE, MAE
from pytorch_forecasting.models.temporal_fusion_transformer.tuning import optimize_hyperparameters

import torch

DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'


class TFT:
    def __init__(self, data, max_prediction_length=12, batch_size=128):
        self.data = data
        self.max_prediction_length = max_prediction_length
        self.batch_size = batch_size
        self.static_categoricals = ['series']

        self.training_cutoff = None
        self.max_encoder_length = None
        self.training = None
        self.validation = None
        self.train_dataloader = None
        self.val_dataloader = None
        self.baseline_predictions = None
        self.hyperparams = None
        self.tft = None
        self.trainer = None
        self.forecasts = None
        self.raw_forecasts = None

    def preprocess_data(self, series_to_merge, season_func=None):
        num_of_series = len(series_to_merge)

        # concatenate columns based on column names in cols_to_concat
        combined_series = pd.concat([self.data[col] for col in series_to_merge], ignore_index=True)
        combined_series.name = 'y'
        combined_series = pd.DataFrame(combined_series)

        combined_series['ds'] = pd.concat([self.data['date']] * num_of_series).reset_index(drop=True)
        combined_series['ds'] = pd.to_datetime(combined_series['ds'])

        series_arr = np.arange(num_of_series).reshape(-1, 1)
        combined_series['series'] = np.repeat(series_arr, combined_series.shape[0] / num_of_series)
        combined_series['series'] = combined_series['series'].astype(str)

        combined_series = (combined_series.merge(
            (combined_series[['ds']].drop_duplicates(ignore_index=True).rename_axis('time_idx')).reset_index(),
            on=['ds']))
        combined_series['month'] = combined_series['ds'].dt.month
        combined_series['year'] = combined_series['ds'].dt.year

        if season_func is not None:
            combined_series["season"] = combined_series.apply(season_func, axis=1)
            self.static_categoricals.append('season')

        self.data = combined_series

        self.max_encoder_length = self.data.ds.nunique()
        self.training_cutoff = self.data["time_idx"].max() - self.max_prediction_length

    def create_ts_dataset(self, lags=[12]):

        self.training = TimeSeriesDataSet(
            self.data[lambda x: x.time_idx <= self.training_cutoff],
            time_idx="time_idx",
            target="y",
            group_ids=['series'],
            min_encoder_length=self.max_encoder_length // 2,
            max_encoder_length=self.max_encoder_length,
            max_prediction_length=self.max_prediction_length,
            static_categoricals=self.static_categoricals,
            time_varying_known_reals=['month', 'year'],
            time_varying_unknown_reals=['y'],
            target_normalizer=GroupNormalizer(
                groups=['series'], transformation='softplus'
            ),
            categorical_encoders={'series': NaNLabelEncoder().fit(self.data.series)},
            lags={'y': lags},
            add_relative_time_idx=True,
            add_target_scales=True,
            add_encoder_length=True,
        )

        self.validation = TimeSeriesDataSet.from_dataset(
            self.training, self.data, predict=True, stop_randomization=True
        )

    def create_dataloaders(self):
        self.train_dataloader = self.training.to_dataloader(
            train=True, batch_size=self.batch_size, num_workers=0
        )
        self.val_dataloader = self.validation.to_dataloader(
            train=False, batch_size=self.batch_size * 10, num_workers=0
        )

    def calculate_baseline_error(self):
        baseline_predictions = Baseline().predict(self.val_dataloader, return_y=True)
        self.baseline_predictions = baseline_predictions

    def optimize_hyperparameters(self, n_trials=200, max_epochs=50, use_learning_rate_finder=False):
        study = optimize_hyperparameters(
            self.train_dataloader,
            self.val_dataloader,
            model_path="tft_hyperopt",
            n_trials=n_trials,
            max_epochs=max_epochs,
            gradient_clip_val_range=(0.01, 1.0),
            hidden_size_range=(8, 128),
            hidden_continuous_size_range=(8, 128),
            attention_head_size_range=(1, 4),
            learning_rate_range=(0.001, 0.1),
            dropout_range=(0.1, 0.3),
            trainer_kwargs=dict(limit_train_batches=30),
            reduce_on_plateau_patience=4,
            use_learning_rate_finder=use_learning_rate_finder,
        )

        self.hyperparams = study.best_trial.params

    def configure_network_and_trainer(self, hyperparams=None, callbacks=None, max_epochs=30, devices=1,
                                      limit_train_batches=30, enable_model_summary=False, loss=QuantileLoss(),
                                      log_interval=10, optimizer='Ranger', reduce_on_plateau_patience=4):

        if hyperparams is None:
            hyperparams = self.hyperparams

        self.trainer = pl.Trainer(
            max_epochs=max_epochs,
            accelerator=DEVICE,
            devices=devices,
            enable_model_summary=enable_model_summary,
            gradient_clip_val=hyperparams["gradient_clip_val"],
            limit_train_batches=limit_train_batches,
            callbacks=callbacks,
        )

        self.tft = TemporalFusionTransformer.from_dataset(
            self.training,
            learning_rate=hyperparams["learning_rate"],
            hidden_size=hyperparams["hidden_size"],
            attention_head_size=hyperparams["attention_head_size"],
            dropout=hyperparams["dropout"],
            hidden_continuous_size=hyperparams["hidden_continuous_size"],
            loss=loss,
            log_interval=log_interval,
            optimizer=optimizer,
            reduce_on_plateau_patience=reduce_on_plateau_patience,
        )

        print(f"Number of parameters in network: {self.tft.size() / 1e3:.1f}k")

    def fit_network(self):
        self.trainer.fit(
            self.tft,
            train_dataloaders=self.train_dataloader,
            val_dataloaders=self.val_dataloader,
        )

        best_model_path = self.trainer.checkpoint_callback.best_model_path
        self.tft = TemporalFusionTransformer.load_from_checkpoint(best_model_path)

    def evaluate(self):
        self.forecasts = self.tft.predict(self.val_dataloader, return_x=True, return_y=True,
                                          trainer_kwargs=dict(accelerator="cpu"))

        date = self.data.iloc[-1]['ds']
        predicted_dates = []

        for i in range(self.max_prediction_length):
            date += relativedelta(months=1)
            predicted_dates.append(date)

        metrics = {
            'MAE': MAE()(self.forecasts.output, self.forecasts.y),
            'MAPE': MAPE()(self.forecasts.output, self.forecasts.y),
            'SMAPE': SMAPE()(self.forecasts.output, self.forecasts.y),
            'RMSE': RMSE()(self.forecasts.output, self.forecasts.y)
        }

        for key, val in metrics.items():
            metrics[key] = round(val.item(), 2)

        forecasts = self.forecasts.output[0].numpy().tolist()
        forecasts = [float(x) for x in forecasts]
        forecasts = list(map(lambda x: round(x, 2), forecasts))

        return forecasts, [dt.strftime('%Y-%m-%d') for dt in predicted_dates], metrics

    def interpret_model(self):
        interpretation = self.tft.interpret_output(self.forecasts.output, reduction="sum")
        self.tft.plot_interpretation(interpretation)
