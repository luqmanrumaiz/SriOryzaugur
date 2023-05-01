from flask import Flask, request
from flask_cors import CORS
import json
import logging
import pandas as pd

from pymongo import MongoClient

from temporal_fusion_transformer import TFT
from pytorch_forecasting import ImplicitQuantileNetworkDistributionLoss

from utils import classify_yaha_mala, retrieve_ts_data
import constants

import warnings

warnings.filterwarnings('ignore')

client = MongoClient(constants.CONNECTION_STRING)

app = Flask(__name__)
CORS(app)

logging.basicConfig(
    level=logging.INFO,
    format='%(levelname)s [%(asctime)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)


@app.route('/generate-forecasts', methods=['POST'])
def generate_forecasts():
    try:
        data = request.get_json()

        selected_series = data.get('selected_series')
        if selected_series is not None:

            date_from = data['date_from']
            date_to = data['date_to']

            df = retrieve_ts_data(client, selected_series, date_from, date_to)

            logging.info('Successfully created TFT')

            tft_model = TFT(data=df)
            logging.info('Successfully created tft')

            tft_model.preprocess_data(df.drop(columns=['date'], axis=1).columns, classify_yaha_mala)
            logging.info('Successfully preprocessed data')

            tft_model.create_ts_dataset()
            tft_model.create_dataloaders()
            logging.info('Successfully prepared ts obj. and dataloaders')

            # tft_model.optimize_hyperparameters(n_trials=2, max_epochs=3, use_learning_rate_finder=False)
            logging.info('Successfully optimized hyperparameters')

            hyperparams = {
                "gradient_clip_val": 0.821352550115402,
                "hidden_size": 113,
                "dropout": 0.1646939509327954,
                "hidden_continuous_size": 46,
                "attention_head_size": 2,
                "learning_rate": 0.0016895193813204448
            }

            tft_model.configure_network_and_trainer(hyperparams=hyperparams,
                                                    loss=ImplicitQuantileNetworkDistributionLoss(), max_epochs=5)
            logging.info('Successfully configured trainer, model is ready for training!')

            tft_model.fit_network()
            logging.info('Successfully fit model')

            model_results = tft_model.evaluate()
            forecasts = model_results[0]
            forecasted_dates = model_results[1]

            forecast_df = pd.DataFrame({
                'value': forecasts,
                'date': forecasted_dates
            })

            start_value = forecast_df.iloc[0]['value']
            end_value = forecast_df.iloc[-1]['value']

            forecast_growth = (end_value - start_value) / start_value
            annualized_growth = (1 + forecast_growth) ** (12 / len(forecast_df)) - 1

            forecast_df['quarter'] = pd.PeriodIndex(forecast_df['date'], freq='Q')

            quarterly_values = forecast_df.groupby('quarter').sum()
            quarterly_growth = quarterly_values.pct_change().dropna()
            highest_growth_quarter = quarterly_growth.idxmax()[0].strftime('%B')

            forecast_summary = f"The forecast predicts a {annualized_growth:.1%} increase over the next 12 months, " \
                               f"with the largest growth expected in {highest_growth_quarter}."

            print(forecast_summary)

            return json.dumps(
                {
                    'success': True,
                    'dates': [dt.strftime('%Y-%m-%d') for dt in df['date'].tolist()] + forecasted_dates,
                    'actuals': df.iloc[:, 1].tolist(),
                    'forecasts': forecasts,
                    'summary': forecast_summary
                }), 200

        elif selected_series is None:
            error_msg = 'The request does not contain the series to be used'
            logging.error(error_msg)

            return json.dumps(
                {
                    'success': False,
                    'message': error_msg
                }), 400

    except Exception as e:
        logging.error('An error occurred: ' + str(e))
        return json.dumps({'success': False, 'message': str(e)}), 500


def run_flask_app():
    app.run(debug=True, host='0.0.0.0', port=5000)


if __name__ == '__main__':
    run_flask_app()
