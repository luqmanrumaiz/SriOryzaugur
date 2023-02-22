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

    # Return the JSON data
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
