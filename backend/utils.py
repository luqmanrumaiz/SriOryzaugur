# Import necessary libraries
import pandas as pd
import constants

# Define a function to classify months as either "maha" or "yala"
def classify_yaha_mala(row):
    month = row['month']

    if month >= 10 or month <= 4:
        return 'maha'
    else:
        return 'yala'

# Define a function to retrieve time series data from a MongoDB database
def retrieve_ts_data(client, selected_series, date_from, date_to):
    # Generate a list of dates between the specified start and end dates
    dates = pd.date_range(start=date_from, end=date_to, freq='MS')
    # Create a new DataFrame with the dates as the index
    df = pd.DataFrame({'date': dates})

    # Loop over each selected time series
    for option in selected_series:
        value = option['value']
        collection = value['collection']
        target = value['target']
        col_name = target
        db = client['historical_db']
        # Check if the collection has associated metadata
        has_metadata = collection in constants.METADATA_FOR_COLLECTION and value.get('metadata') is not None

        # If metadata is present, use it to filter the data from the database
        if has_metadata:
            metadata = value.get('metadata')
            col_name += "_" + metadata[constants.METADATA_FOR_COLLECTION[collection]]
            data = list(db[collection].find(metadata))
        # If metadata is not present, retrieve all data from the collection
        else:
            data = list(db[collection].find())

        # Convert the retrieved data into a DataFrame
        temp_df = pd.DataFrame(data)
        # Rename the column containing the time series data to the specified target name
        temp_df.rename(columns={target: col_name}, inplace=True)
        # Create a list of columns to drop from the DataFrame
        drop_cols = ['_id']

        # If metadata is present or if the collection has associated metadata but no metadata was specified, drop the
        # metadata column(s)
        if has_metadata or (collection in constants.METADATA_FOR_COLLECTION and value.get('metadata') is None):
            if collection in constants.METADATA_FOR_COLLECTION and value.get('metadata') is None:
                temp_df = temp_df[temp_df['district'].isnull()]
            drop_cols.append(constants.METADATA_FOR_COLLECTION[collection])

        # Drop the specified columns from the DataFrame
        temp_df.drop(columns=drop_cols, axis=1, inplace=True)
        # Merge the current DataFrame with the main DataFrame on the date column
        df = pd.merge(df, temp_df, on='date')

    # Return the final DataFrame
    return df

# This function generates a summary of the forecasted values
import pandas as pd

def get_forecast_summary(forecasts, forecasted_dates):
    # Create a DataFrame with the forecasted values and dates
    forecast_df = pd.DataFrame({
        'value': forecasts,
        'date': forecasted_dates
    })

    # Compute the start and end values for the forecast period
    start_value = forecast_df.iloc[0]['value']
    end_value = forecast_df.iloc[-1]['value']

    # Compute the overall growth rate for the forecast period and the annualized growth rate
    forecast_growth = (end_value - start_value) / start_value
    annualized_growth = (1 + forecast_growth) ** (12 / len(forecast_df)) - 1

    # Determine whether the growth is positive or negative and adjust the summary string accordingly
    if forecast_growth >= 0:
        summary = f"The forecast predicts a {annualized_growth:.1%} increase over the next 12 months."
    else:
        summary = f"The forecast predicts a {abs(annualized_growth):.1%} decrease over the next 12 months."

    # Group the forecast values by quarter and compute the quarterly growth rates
    forecast_df['quarter'] = pd.PeriodIndex(forecast_df['date'], freq='Q')
    quarterly_values = forecast_df.groupby('quarter')['value'].sum()

    # Convert the 'value' column in quarterly_values to numeric values
    quarterly_values = pd.to_numeric(quarterly_values)

    # Compute the quarter-to-quarter percentage change in the forecast values and drop missing values
    quarterly_growth = quarterly_values.pct_change().dropna()

    # Find the quarter with the highest growth rate and format the summary string
    highest_growth_quarter = quarterly_growth.idxmax().strftime('%B')
    summary += f" The largest growth is expected in {highest_growth_quarter}."

    # Return the summary string
    return summary


