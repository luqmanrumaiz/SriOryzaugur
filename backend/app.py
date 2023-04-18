import json

from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import csv

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS


@app.route('/generate-forecasts', methods=['POST'])
def generate_forecasts():
    try:
        data = json.loads(request.data)
        if data:
            # Perform necessary operations on the parsed data to generate forecasts
            # (replace this with your actual logic)

            print(data[0])

            # Convert the results to JSON
            results = json.dumps(data)
            df = pd.read_json(results)



            print(df)

            return results, 200
        else:
            return json.dumps({'success': False, 'message': 'No data found'}), 400
    except Exception as e:
        return json.dumps({'success': False, 'message': str(e)}), 500
    # # Get data from the request
    # data = request.get_json()
    # # data = json.loads(data)
    # print(data[1])
    #
    # # data = json.loads(data)
    #
    #
    # # create dataframe
    # df = pd.json_normalize(data)
    # df.to_csv('file1.csv')
    # # data_file = open('jsonoutput.csv', 'w', newline='')
    # # csv_writer = csv.writer(data_file)
    # #
    # # count = 0
    # # for data in data:
    # #     if count == 0:
    # #         header = data.keys()
    # #         csv_writer.writerow(header)
    # #         count += 1
    # #     csv_writer.writerow(data.values())
    # #
    # # data_file.close()
    #
    # response = {'message': 'File uploaded successfully'}
    # return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
