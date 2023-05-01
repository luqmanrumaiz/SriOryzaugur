from flask import Flask, request
from flask_cors import CORS
import json
import logging

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

        selected_series = data['selected_series']
        print(selected_series)

        if selected_series:
            date_from = data['date_from']
            date_to = data['date_to']

            df = retrieve_ts_data(client, selected_series, date_from, date_to)
            print(df)

            logging.info('Successfully created TFT')

            tft_model = TFT(data=df)
            logging.info('Successfully created tft')

            print(df.drop(columns=['date'], axis=1).columns)
            tft_model.preprocess_data(df.drop(columns=['date'], axis=1).columns, classify_yaha_mala)
            logging.info('Successfully preprocessed data')

            tft_model.create_ts_dataset()
            tft_model.create_dataloaders()
            logging.info('Successfully prepared ts obj. and dataloaders')

            tft_model.optimize_hyperparameters(n_trials=2, max_epochs=3, use_learning_rate_finder=False)
            logging.info('Successfully optimized hyperparameters')

            tft_model.configure_network_and_trainer(loss=ImplicitQuantileNetworkDistributionLoss(), max_epochs=5)
            logging.info('Successfully configured trainer, model is ready for training!')

            tft_model.fit_network()
            logging.info('Successfully fit model')

            tft_model.evaluate()

            return json.dumps({'success': True, 'message': 'HEY'}), 200

    except Exception as e:
        logging.error('An error occurred: %s ‼️ ', str(e), exc_info=True)
        return json.dumps({'success': False, 'message': str(e)}), 500


def run_flask_app():
    app.run(debug=True, host='0.0.0.0', port=5000)


if __name__ == '__main__':
    run_flask_app()
