import argparse
from flask import Flask, request
from flask_cors import CORS
from pyngrok import ngrok
import json
import logging

from pymongo import MongoClient

from model.temporal_fusion_transformer import TFT
from pytorch_forecasting import ImplicitQuantileNetworkDistributionLoss

from utils import classify_yaha_mala, retrieve_ts_data, get_forecast_summary
import constants

import warnings
warnings.filterwarnings('ignore')

parser = argparse.ArgumentParser(description='Run Flask app with or without Ngrok')
parser.add_argument('--ngrok', action='store_true', help='Run with Ngrok')
args = parser.parse_args()

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

            tft_model.optimize_hyperparameters(n_trials=2, max_epochs=3, use_learning_rate_finder=False)
            logging.info('Successfully optimized hyperparameters')

            tft_model.configure_network_and_trainer(loss=ImplicitQuantileNetworkDistributionLoss())
            logging.info('Successfully configured trainer, model is ready for training!')

            tft_model.fit_network()
            logging.info('Successfully fit model')

            model_results = tft_model.evaluate()
            forecasts = model_results[0]
            forecasted_dates = model_results[1]
            metrics = model_results[2]

            return json.dumps(
                {
                    'success': True,
                    'dates': [dt.strftime('%Y-%m-%d') for dt in df['date'].tolist()] + forecasted_dates,
                    'actuals': df.iloc[:, 1].tolist(),
                    'forecasts': forecasts,
                    'summary': get_forecast_summary(forecasts, forecasted_dates),
                    'metrics': metrics
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


if __name__ == '__main__':
    if args.ngrok:
        try:
            ngrok.set_auth_token(constants.NGROK_AUTH_TOKEN)
            http_tunnel = ngrok.connect(5000)

            print(f" * Running on {http_tunnel}")

        except KeyboardInterrupt:
            print(" Shutting down server.")

            ngrok.kill()

        app.run(port=5000)

    else:
        app.run(port=5000, debug=True)
