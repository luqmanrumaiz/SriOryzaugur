export const SERIES_OPTIONS = [
    {
        value: {
            metadata: {variate: 'nadu'},
            collection: 'retail_prices',
            target: 'price'
        },
        label: 'Price'
    },
    {
        value: {
            collection: 'producer_prices',
            target: 'producer_price'
        },
        label: 'Producer Price (AVG)'
    },
    {
        value: {
            metadata: {district: 'anuradhapura'}, 
            collection: 'producer_prices',
            target: 'producer_price'
        },
        label: 'Producer Price (Anuradhapura)'
    },
    {
        value: {
            metadata: {district: 'kurunegala'},
            collection: 'producer_prices',
            target: 'producer_price'
        },
        label: 'Producer Price (Kurunegala)'
    },
    {
        value: {
            metadata: {district: 'polonnaruwa'},
            collection: 'producer_prices',
            target: 'producer_price'
        },
        label: 'Producer Price (Polonnaruwa)'
    },
    {
        value: {
            collection: 'exchange_rate',
            target: 'exchange_rate'
        },
        label: 'Exchange Rate'
    },
    {
        value: {
            metadata: {fuel_type: 'diesel'},
            collection: 'fuel_prices',
            target: 'fuel_price'
        },
        label: 'Fuel Prices'
    },
    {
        value: {
            metadata: {monetary_aggregate_type: 'm1'},
            collection: 'monetary_aggregates',
            target: 'amount_mm'
        },
        label: 'Money Supply'
    }
]