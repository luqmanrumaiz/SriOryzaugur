import React, {useState, useEffect} from 'react';
import axios from 'axios';

import LineChart from '../components/charts/lineChart.js'
import Header from '../components/pages/header.js'
import {tailwindConfig, hexToRGB, formatValue} from '../utils/utils.js';
import {Colors} from '../values/colors.js';


const HistoricalFiguresPage = () => {
    const [historicalData, setHistoricalData] = useState([]);
    const [dates, setDates] = useState([]);
    const [retailPrices, setRetailPrices] = useState([]);
    const [chartInitialized, setChartInitialized] = useState(false);

    const [chartData, setChartData] = useState({
        labels: dates,
        datasets: [
            {
                data: retailPrices,
                fill: true,
                borderColor: tailwindConfig().theme.colors.green[500],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: tailwindConfig().theme.colors.green[500],
                clip: 20,
            }
        ],
    });

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/retrieve-historical-data/`)
            .then(res => {
                console.log("Data:", JSON.parse(res.data).map(obj => new Date(obj.Date).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                }).replace(/\//g, '-')));

                setHistoricalData(JSON.parse(res.data));
                setDates(JSON.parse(res.data).map(obj => new Date(obj.Date).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                }).replace(/\//g, '-')));
                setRetailPrices(JSON.parse(res.data).map(obj => obj.Price));
                setChartInitialized(true);
            })
    }, []);

    useEffect(() => {
        chartData.labels = dates;
        chartData.datasets[0].data = retailPrices;
    }, [dates, retailPrices]);

    return (
        <div>
            <Header heading="View Historical Prices"/>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-96 rounded-lg border-4 border-dashed border-green-600 p-10">
                            {chartInitialized && (
                                <LineChart data={chartData} width={595} height={248}/>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            {
                retailPrices.map(data =>
                    <p>{data}</p>
                )
            }
        </div>
    );
};

export default HistoricalFiguresPage;
