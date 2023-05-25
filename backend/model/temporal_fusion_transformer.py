# Import necessary libraries
import pandas as pd
import numpy as np
from dateutil.relativedelta import relativedelta

import lightning.pytorch as pl
from lightning.pytorch.tuner import Tuner

from pytorch_forecasting import Baseline, TimeSeriesDataSet, TemporalFusionTransformer
from pytorch_forecasting.data import GroupNormalizer, NaNLabelEncoder
from pytorch_forecasting.metrics import SMAPE, QuantileLoss, RMSE, MAPE, MAE
from pytorch_forecasting.models.temporal_fusion_transformer.tuning import optimize_hyperparameters

import torch

# Check if GPU is available
DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'


# Define TFT class
class TFT:
    def __init__(self, data, max_prediction_length=12, batch_size=128):
        """
        Initialize TFT class.

        Args:
            data: pandas DataFrame, input data
            max_prediction_length: int, maximum number of steps to predict
            batch_size: int, batch size for training and validation dataloaders
        """
        self.data = data
        self.max_prediction_length = max_prediction_length
        self.batch_size = batch_size
        self.static_categoricals = ['series']  # List of static categorical features

        self.training_cutoff = None
        self.max_encoder_length = None
        self.training = None
        self.validation = None
        self.train_dataloader = None
        self.val_dataloader = None
        self.baseline_predictions = None
        self.learning_rate = None
        self.hyperparams = None
        self.tft = None
        self.trainer = None
        self.forecasts = None
        self.raw_forecasts = None

    def preprocess_data(self, series_to_merge, season_func=None):
        """
        Preprocess input data.

        Args:
            series_to_merge: list of column names to concatenate
            season_func: function to compute season feature, if any
        """
        num_of_series = len(series_to_merge)

        # concatenate columns based on column names in cols_to_concat
        combined_series = pd.concat([self.data[col] for col in series_to_merge], ignore_index=True)
        combined_series.name = 'y'
        combined_series = pd.DataFrame(combined_series)

        # create 'ds' column
        combined_series['ds'] = pd.concat([self.data['date']] * num_of_series).reset_index(drop=True)
        combined_series['ds'] = pd.to_datetime(combined_series['ds'])

        # create 'series' column
        series_arr = np.arange(num_of_series).reshape(-1, 1)
        combined_series['series'] = np.repeat(series_arr, combined_series.shape[0] / num_of_series)
        combined_series['series'] = combined_series['series'].astype(str)

        # merge with time index
        combined_series = (combined_series.merge(
            (combined_series[['ds']].drop_duplicates(ignore_index=True).rename_axis('time_idx')).reset_index(),
            on=['ds']))
        combined_series['month'] = combined_series['ds'].dt.month
        combined_series['year'] = combined_series['ds'].dt.year

        # add season feature if specified
        if season_func is not None:
            combined_series["season"] = combined_series.apply(season_func, axis=1)
            self.static_categoricals.append('season')

        # update data and set training cutoff
        self.data = combined_series
        self.max_encoder_length = self.data.ds.nunique()
        self.training_cutoff = self.data["time_idx"].max() - self.max_prediction_length

    def create_ts_dataset(self, lags=[12], normalize=True):
        """
        Create TimeSeriesDataSet for training and validation.

        Args:
            lags: list of lag values for input features
            normalize: boolean, whether or not to normalize input data

        Returns:
            None
        """

        if normalize:
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
        else:
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
                categorical_encoders={'series': NaNLabelEncoder().fit(self.data.series)},
                lags={'y': lags},
                add_relative_time_idx=True,
                add_target_scales=True,
                add_encoder_length=True,
            )

        # create validation dataset from training dataset
        self.validation = TimeSeriesDataSet.from_dataset(
            self.training, self.data, predict=True, stop_randomization=True
        )

    def create_dataloaders(self):
        """
        Create PyTorch DataLoader objects for training and validation datasets.

        Returns:
            None
        """
        self.train_dataloader = self.training.to_dataloader(
            train=True, batch_size=self.batch_size, num_workers=0
        )
        self.val_dataloader = self.validation.to_dataloader(
            train=False, batch_size=self.batch_size * 10, num_workers=0
        )

    def calculate_baseline_error(self):
        """
        Calculate baseline error using a simple "last observed value" model.

        Returns:
            None
        """
        baseline_predictions = Baseline().predict(self.val_dataloader, return_y=True)
        self.baseline_predictions = baseline_predictions

    def optimize_lr(self, plot_lr=False):
        """
        Optimize learning rate using PyTorch Lightning's built-in learning rate finder.

        Args:
            plot_lr: boolean, whether or not to plot the learning rate curve

        Returns:
            None
        """
        # set seed for reproducibility
        pl.seed_everything(42)

        # initialize PyTorch Lightning trainer
        trainer = pl.Trainer(
            accelerator=DEVICE,
            gradient_clip_val=0.1,
        )

        # initialize TFT model with default hyperparameters
        tft = TemporalFusionTransformer.from_dataset(
            self.training,
            learning_rate=0.03,
            hidden_size=8,
            attention_head_size=1,
            dropout=0.1,
            hidden_continuous_size=8,
            loss=QuantileLoss(),
            optimizer="Ranger"
        )

        # print number of parameters in the model
        print(f"Number of parameters in network: {tft.size() / 1e3:.1f}k")

        # run learning rate finder
        res = Tuner(trainer).lr_find(
            tft,
            train_dataloaders=self.train_dataloader,
            val_dataloaders=self.val_dataloader,
            max_lr=10.0,
            min_lr=1e-6,
        )

        # save suggested learning rate
        self.learning_rate = res.suggestion()
        print(f"suggested learning rate: {res.suggestion()}")

        # plot learning rate curve if requested
        if plot_lr:
            fig = res.plot(show=True, suggest=True)
            fig.show()

    def tune_hyperparameters(self, n_trials=10, max_epochs=50, use_learning_rate_finder=False):
        """
        Optimize hyperparameters using Optuna.

        Args:
            n_trials: int, number of trials to run
            max_epochs: int, maximum number of epochs per trial
            use_learning_rate_finder: boolean, whether or not to use PyTorch Lightning's built-in learning rate finder

        Returns:
            None
        """
        # run hyperparameter optimization
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

        # save best hyperparameters
        self.hyperparams = study.best_trial.params

    def configure_network_and_trainer(self, hyperparams=None, callbacks=None, max_epochs=30, devices=1,
                                      limit_train_batches=30, enable_model_summary=False, loss=QuantileLoss(),
                                      log_interval=10, reduce_on_plateau_patience=4):
        """
        Configure TFT model and PyTorch Lightning trainer.

        Args:
            hyperparams: dictionary of hyperparameters to use (if None, use self.hyperparams)
            callbacks: list of PyTorch Lightning callbacks
            max_epochs: int, maximum number of epochs to train for
            devices: int, number of GPUs to use for training
            limit_train_batches: int, number of batches to use for each training epoch
            enable_model_summary: boolean, whether or not to enable PyTorch Lightning's model summary
            loss: PyTorch loss function to use
            log_interval: int, how often to log training metrics
            reduce_on_plateau_patience: int, how many epochs to wait before reducing learning rate on plateau

        Returns:
            None
        """
        # use default hyperparameters if not specified
        if hyperparams is None and self.hyperparams is not None:
            hyperparams = self.hyperparams
        else:
            hyperparams = {
                "gradient_clip_val": 0.1,
                "limit_train_batches": 30,
                "learning_rate": 0.03,
                "hidden_size": 16,
                "attention_head_size": 2,
                "dropout": 0.1,
                "hidden_continuous_size": 8
            }

        # initialize PyTorch Lightning trainer
        self.trainer = pl.Trainer(
            max_epochs=max_epochs,
            accelerator=DEVICE,
            devices=devices,
            enable_model_summary=enable_model_summary,
            gradient_clip_val=hyperparams["gradient_clip_val"],
            limit_train_batches=limit_train_batches,
            callbacks=callbacks,
        )

        # initialize TFT model
        self.tft = TemporalFusionTransformer.from_dataset(
            self.training,
            learning_rate=self.learning_rate if self.learning_rate is not None else hyperparams["learning_rate"],
            hidden_size=hyperparams["hidden_size"],
            attention_head_size=hyperparams["attention_head_size"],
            dropout=hyperparams["dropout"],
            hidden_continuous_size=hyperparams["hidden_continuous_size"],
            loss=loss,
            log_interval=log_interval,
            reduce_on_plateau_patience=reduce_on_plateau_patience,
        )

        # print number of parameters in model
        print(f"Number of parameters in network: {self.tft.size() / 1e3:.1f}k")

    def fit_network(self):
        """
        Train TFT model.

        Args:
            None

        Returns:
            None
        """
        # fit the model
        self.trainer.fit(
            self.tft,
            train_dataloaders=self.train_dataloader,
            val_dataloaders=self.val_dataloader,
        )

        # load best model
        best_model_path = self.trainer.checkpoint_callback.best_model_path
        self.tft = TemporalFusionTransformer.load_from_checkpoint(best_model_path)

    def evaluate(self, actuals):
        """
        Evaluate the trained model.

        Args:
            None

        Returns:
            forecasts: list of floats, predicted values for the next 12 months
            predicted_dates: list of strings, predicted dates for the next 12 months
            metrics: dictionary of evaluation metrics (MAE, MAPE, SMAPE, RMSE)
        """
        # make forecasts
        self.forecasts = self.tft.predict(self.val_dataloader, return_x=True, return_y=True,
                                          trainer_kwargs=dict(accelerator="cpu"))
        self.raw_forecasts = self.tft.predict(self.val_dataloader, mode="raw", return_x=True)

        # generate predicted dates
        date = self.data.iloc[-1]['ds']
        predicted_dates = []
        for i in range(self.max_prediction_length):
            date += relativedelta(months=1)
            predicted_dates.append(date)

        # format forecasts
        forecasts = self.forecasts.output[0].numpy().tolist()
        forecasts = [float(x) for x in forecasts]
        forecasts = list(map(lambda x: round(x, 2), forecasts))

        actuals_arr = np.array(actuals)
        forecasts_arr = np.array(forecasts)

        mape = np.mean(np.abs((actuals_arr - forecasts_arr) / actuals_arr))
        mae = np.mean(np.abs(actuals_arr - forecasts_arr))
        rmse = np.sqrt(np.mean((actuals_arr - forecasts_arr)))

        # calculate evaluation metrics
        metrics = {
            'MAE': mae,
            'MAPE': mape,
            'RMSE': rmse
        }
        for key, val in metrics.items():
            metrics[key] = round(val.item(), 2)

        return forecasts, [dt.strftime('%Y-%m-%d') for dt in predicted_dates], metrics

    def interpret_model(self):
        """
        Plot feature importances of the trained model.

        Args:
            None

        Returns:
            None
        """
        # calculate feature importances and plot them
        interpretation = self.tft.interpret_output(self.raw_forecasts.output, reduction="sum")
        self.tft.plot_interpretation(interpretation)

    def plot_forecasts(self, plot_all_series=False):
        """
        Plot the forecasts for a single series or all series.

        Args:
            plot_all_series: bool, whether to plot forecasts for all series (default=False)

        Returns:
            None
        """
        if plot_all_series:
            # plot forecasts for all series
            for idx in range(self.data.series.nunique()):
                self.tft.plot_prediction(
                    self.raw_forecasts.x,
                    self.raw_forecasts.output,
                    idx=idx,
                    add_loss_to_title=True,
                )
        else:
            # plot forecasts for a single series
            self.tft.plot_prediction(self.raw_forecasts.x, self.raw_forecasts.output, idx=0)
