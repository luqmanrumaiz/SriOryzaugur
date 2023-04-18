export const SERIES_OPTIONS = [
    {
        value: {
            variate: 'nadu',
            target: 'price'
        },
        label: 'Price'
    },
    {
        value: {
            target: 'producer_price'
        },
        label: 'Producer Price (AVG)'
    },
    {
        value: {
            district: 'anuradhapura',
            target: 'producer_price'
        },
        label: 'Producer Price (Anuradhapura)'
    },
    {
        value: {
            district: 'kurunegala',
            target: 'producer_price'
        },
        label: 'Producer Price (Kurunegala)'
    },
    {
        value: {
            district: 'polonaruwa',
            target: 'producer_price'
        },
        label: 'Producer Price (Polonaruwa)'
    },
    {
        value: {
            target: 'exchange_rate'
        },
        label: 'Exchange Rate'
    },
    {
        value: {
            monetary_aggregate_type: 'm1',
            target: 'money_supply'
        },
        label: 'Money Supply'
    }
]