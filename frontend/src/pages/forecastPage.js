import React, {useEffect, useState} from 'react';
import axios from 'axios';

import LineChart from '../components/charts/lineChart.js'
import Header from '../components/pages/header.js'
import {tailwindConfig, hexToRGB} from '../utils/utils.js';
import Select from 'react-select'

const colourOptions = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
]

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
    useEffect(() => {
        // Define an async function to fetch data from API
        const fetchData = async () => {
            try {
                // Make API request using Axios
                const response = await axios.get('https://8c9b-35-230-164-80.ngrok-free.app/create_model');

                // Update state with fetched data
                console.log(response.data);
//                setLoading(false);
            } catch (error) {
                // Handle error
//                setError(error);
//                setLoading(false);
            }
        };

        // Call the async function to fetch data
        fetchData();
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Header heading="Lets Start Forecasting 📈"/>
            <main>
                {/* Comment for using code from tailwindcomponents.com */}
                {/* Author: GalihRendis (https://tailwindcomponents.com/u/galihrendis) */}
                {/* Date: N.A */}
                {/* Title: Form 4 Component */}
                {/* Code version: tailwindcss@2.2.4 */}
                {/* Type: React Component */}
                {/* Web address: https://tailwindcomponents.com/component/form-4 */}

                <section className="max-w-4xl p-6 mx-auto bg-yellow-600 rounded-md shadow-md dark:bg-gray-800 mt-10">
                    <h1 className="text-xl font-bold text-white dark:text-white">Please enter the below fields to create
                        your forecasting model</h1>
                    <form>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-white dark:text-gray-200" htmlFor="date_from">Date From
                                    Start</label>
                                <input id="date_from" type="month" min="2020-01" max="2023-12" placeholder="YYYY-MM"
                                       required
                                       className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                            </div>
                            <div>
                                <label className="text-white dark:text-gray-200" htmlFor="date_to">Date to End 🔚</label>
                                <input id="date_to" type="month" min="2020-01" max="2023-12" placeholder="YYYY-MM"
                                       required
                                       className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                            </div>

                            <div>
                                <label className="text-white dark:text-gray-200" htmlFor="emailAddress">Email
                                    Address</label>
                                <input id="emailAddress" type="email"
                                       className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                            </div>

                            <div>
                                <label className="text-white dark:text-gray-200" htmlFor="password">Password</label>
                                <input id="password" type="password"
                                       className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                            </div>

                            <div>
                                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Password
                                    Confirmation</label>
                                <Select
                                    defaultValue={[colourOptions[2], colourOptions[3]]}
                                    isMulti
                                    name="colors"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                /> {/*<input id="passwordConfirmation" type="password"*/}
                                {/*       className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />*/}
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save
                            </button>
                        </div>
                    </form>
                </section>

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
