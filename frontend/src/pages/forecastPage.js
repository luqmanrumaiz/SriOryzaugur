import React from 'react';

import LineChart from '../components/charts/lineChart.js'
import Header from '../components/pages/header.js'
import {tailwindConfig, hexToRGB, formatValue} from '../utils/utils.js';
import {Colors} from '../values/colors.js';

const chartData = {
    labels: [
        '12-01-2020', '01-01-2021', '02-01-2021',
        '03-01-2021', '04-01-2021', '05-01-2021',
        '06-01-2021', '07-01-2021', '08-01-2021',
        '09-01-2021', '10-01-2021', '11-01-2021',
        '12-01-2021', '01-01-2022', '02-01-2022',
        '03-01-2022', '04-01-2022', '05-01-2022',
        '06-01-2022', '07-01-2022', '08-01-2022',
        '09-01-2022', '10-01-2022', '11-01-2022',
        '12-01-2022', '01-01-2023',
    ],
    datasets: [
        // Indigo line
        {
            data: [
                622, 622, 426, 471, 365, 365, 238,
                324, 288, 206, 324, 324, 500, 409,
                409, 273, 232, 273, 500, 570, 767,
                808, 685, 767, 685, 685,
            ],
            fill: true,
            backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[600])}, 0.08)`,
            borderColor: tailwindConfig().theme.colors.green[500],
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.green[500],
            clip: 20,
        },
        // Gray line
        {
            data: [
                732, 610, 610, 504, 504, 504, 349,
                349, 504, 342, 504, 610, 391, 192,
                154, 273, 191, 191, 126, 263, 349,
                252, 423, 622, 470, 532,
            ],
            borderColor: tailwindConfig().theme.colors.slate[300],
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
            clip: 20,
        },
    ],
};

const ForecastPage = () => {
    return (
        <div>
            <Header heading="Forecast"/>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-96 rounded-lg border-4 border-dashed border-green-600 p-10">
                            <LineChart data={chartData} width={595} height={248}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
        ;
};

export default ForecastPage;
