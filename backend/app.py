import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from pymongo import MongoClient
from datetime import datetime
import constants

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS

# Provide the mongodb atlas url to connect python to mongodb using pymongo
CONNECTION_STRING = 'mongodb+srv://srioryzaugur-admin:QCRTnE40At3naapw@timeseriesdata.xtliqai.mongodb.net/'

# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
client = MongoClient(CONNECTION_STRING)


def _validate_additional_data(df, selected_series):
    df.columns = df.iloc[0]
    df = df[1:].reset_index(drop=True)
    df.replace('', None, inplace=True)

    # Check if any value in the array does not equal any column in the DataFrame
    values_not_in_columns = [val for val in selected_series if val not in df.columns]

    if len(values_not_in_columns) > 0:
        print(
            f'The following selected series do : {values_not_in_columns}')
    else:
        print('All values in the array match columns in the DataFrame.')

    if df.isnull().any().any():
        return json.dumps({'success': False, 'message': 'There are null values in your data'}), 200
    else:
        return json.dumps({'success': True, 'message': 'Successfully validated data'}), 200


# def get_db_data(selected_series):
#     db = client['historical_db']
#
#     for option in selected_series:
#         value = option['value']
#         collection = value['collection']
#         target = value['target']
#         label = option['label']
#
#
#         metadata = value.get('metadata', {'metadata': ''})  # Use empty dictionary as default value
#
#         data = []
#
#         for item in db[collection].find():
#             print(target)
#             data.append(item)


@app.route('/validate-additional-data', methods=['POST'])
def validate_additional_data():
    try:
        data = json.loads(request.data)
        if data:
            # Convert the results to JSON
            results = json.dumps(data['uploaded_file_data'])

            df = pd.read_json(results)

            df.columns = df.iloc[0]
            df = df[1:].reset_index(drop=True)
            df.replace('', None, inplace=True)

            # Check if any value in the array does not equal any column in the DataFrame
            values_not_in_columns = [val for val in data['selected_series'] if val not in df.columns]

            # Validation for selected series
            if len(values_not_in_columns) > 0:
                return 'The series that you selected are not present in the additional data that you have provided', False

            # Validation for null values
            if df.isnull().any().any():
                return 'There are null values in your data', False

        else:
            return json.dumps({'success': False, 'message': 'No data found'}), 400

    except Exception as e:
        return json.dumps({'success': False, 'message': str(e)}), 500


@app.route('/generate-forecasts', methods=['POST'])
def generate_forecasts():
    try:
        data = request.get_json()

        selected_series = data['selected_series']

        if selected_series:
            
            date_range = data['date_range']

            start, end = date_range.split('-')
            dates = pd.date_range(start=start, end=end, freq='MS')

            df = pd.DataFrame({'date': dates})

            print(df)

            for option in selected_series:

                value = option['value']

                print('value : ')
                print(value)
                print('\n')

                collection = value['collection']

                print('collection : ')
                print(collection)
                print('\n')

                target = value['target']

                print('target : ')
                print(target)
                print('\n')

                label = option['label']

                print('label : ')
                print(label)
                print('\n')

                db = client['historical_db']

                metadata = value.get('metadata', {'metadata': ''})  # Use empty dictionary as default value
                print(metadata)

                print(metadata[constants.METADATA_FOR_COLLECTION[collection]])

                data = []

                for item in db[collection].find(metadata):
                    data.append(item)

                df_temp = pd.DataFrame(data)
                df_temp.rename(columns={target: metadata[constants.METADATA_FOR_COLLECTION[collection]]
                                                + '_' + target}, inplace=True)

                df_temp.drop(columns=[constants.METADATA_FOR_COLLECTION[collection], '_id'], axis=1, inplace=True)

                print(df_temp)

                df = pd.merge(df, df_temp, on='date')

            print('\n\n')
            print(df)

            return json.dumps({'success': False, 'message': 'No data found'}), 400

    except Exception as e:
        return json.dumps({'success': False, 'message': "AS" + str(e)}), 500


@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()

    selected_series = data['selected_series']
    for series in selected_series:
        for key, value in series.items():
            print(f'{key}: {value}')

    return 'Done'


if __name__ == '__main__':
    app.run(debug=True)
