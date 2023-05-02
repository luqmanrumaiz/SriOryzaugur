import pandas as pd
import constants


def classify_yaha_mala(row):
    month = row['month']

    if month >= 10 or month <= 4:
        return 'maha'
    else:
        return 'yala'


def retrieve_ts_data(client, selected_series, date_from, date_to):
    dates = pd.date_range(start=date_from, end=date_to, freq='MS')
    df = pd.DataFrame({'date': dates})

    for option in selected_series:
        value = option['value']
        collection = value['collection']
        target = value['target']
        col_name = target
        db = client['historical_db']
        has_metadata = collection in constants.METADATA_FOR_COLLECTION and value.get('metadata') is not None

        if has_metadata:
            metadata = value.get('metadata')
            col_name += "_" + metadata[constants.METADATA_FOR_COLLECTION[collection]]
            data = list(db[collection].find(metadata))
        else:
            data = list(db[collection].find())

        temp_df = pd.DataFrame(data)
        temp_df.rename(columns={target: col_name}, inplace=True)
        drop_cols = ['_id']

        if has_metadata or (collection in constants.METADATA_FOR_COLLECTION and value.get('metadata') is None):
            if collection in constants.METADATA_FOR_COLLECTION and value.get('metadata') is None:
                temp_df = temp_df[temp_df['district'].isnull()]
            drop_cols.append(constants.METADATA_FOR_COLLECTION[collection])

        temp_df.drop(columns=drop_cols, axis=1, inplace=True)
        df = pd.merge(df, temp_df, on='date')

    return df


def get_forecast_summary(forecasts, forecasted_dates):
    # Create DataFrame with forecasted values and dates
    forecast_df = pd.DataFrame({
        'value': forecasts,
        'date': forecasted_dates
    })

    # Compute start and end values for forecast period
    start_value = forecast_df.iloc[0]['value']
    end_value = forecast_df.iloc[-1]['value']

    # Compute overall growth rate for forecast period and annualized growth rate
    forecast_growth = (end_value - start_value) / start_value
    annualized_growth = (1 + forecast_growth) ** (12 / len(forecast_df)) - 1

    # Group forecast values by quarter and compute quarterly growth rates
    forecast_df['quarter'] = pd.PeriodIndex(forecast_df['date'], freq='Q')
    quarterly_values = forecast_df.groupby('quarter').sum()
    quarterly_growth = quarterly_values.pct_change().dropna()

    # Find quarter with the highest growth rate and format summary string
    highest_growth_quarter = quarterly_growth.idxmax()[0].strftime('%B')
    summary = f"The forecast predicts a {annualized_growth:.1%} increase over the next 12 months, " \
              f"with the largest growth expected in {highest_growth_quarter}."

    return summary
