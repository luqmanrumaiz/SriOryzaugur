from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)


# API that returns the historical data
@app.route('/retrieve-historical-data/', methods=['GET'])
def home():
    # Load the data from a CSV file
    df = pd.read_csv('data/processed_data.csv')

    # Convert the dataframe to JSON format
    data = df.to_json(orient='records')

    # Convert the data to JSON
    response = jsonify(data)

    # Add the Access-Control-Allow-Origin header to the response
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')

    return response


if __name__ == '__main__':
    app.run(debug=True)
