import React, {useState, useEffect} from 'react';
import axios from 'axios';

import LineChart from '../components/charts/lineChart.js'
import Header from '../components/pages/header.js'
import {tailwindConfig} from '../utils/utils.js';

const HistoricalFiguresPage = () => {
    const [historicalData, setHistoricalData] = useState([]);
    const [chartInitialized, setChartInitialized] = useState(false);
    const chartData = {
        datasets: [],
    };

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/retrieve-historical-data/`)
            .then(res => {
//                console.log(JSON.parse(res.data))

                setHistoricalData(JSON.parse(res.data));
                setChartInitialized(true);
            })
    }, []);

    useEffect(() => {
        // Creating a new array for the Date column to be used as the label of the chart
        chartData.labels = historicalData.map(obj => new Date(obj.Date));

        if (chartInitialized)
            // Iterating through a row of the historical data to identify each column
            for (let column in historicalData[0]) {
                // As date is the index, it is not added to the dataset property of chartData
                if (column !== "Date") {
                    // Appending an option to create a line for each column or dataset
                    let dataset = historicalData.map(obj => obj[column]);
                    chartData.datasets.push({
                        label: column,
                        data: dataset,
//                        fill: true,
                        borderColor: tailwindConfig().theme.colors.green[500],
                        borderWidth: 2,
                        tension: 0,
                        pointRadius: 0,
                        pointHoverRadius: 3,
                        pointBackgroundColor: tailwindConfig().theme.colors.green[500],
                        clip: 20,
                    })
                }
            }
    }, [historicalData]);

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
        </div>
    );
};

export default HistoricalFiguresPage;
