import React, {useEffect, useRef, useState} from 'react';
import Header from '../components/pages/header.js'
import Select from 'react-select'
import {SERIES_OPTIONS} from '../values/constants';
import Spinner from "../components/forecast/spinner";
import LineChart from '../components/charts/lineChart.js'
import {tailwindConfig, hexToRGB} from '../utils/utils.js';

const ForecastPage = () => {

    const [step, setStep] = useState(1);

    const [selectedOptions, setSelectedOptions] = useState(SERIES_OPTIONS[0]);

    const [allowedDateRange, setAllowedDateRange] = useState(["1996-01", "2022-12"])
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [dateLabels, setDateLabels] = useState([])
    const [actuals, setActuals] = useState([])
    const [forecasts, setForecasts] = useState([])
    const [forecastSummary, setForecastSummary] = useState('')
    const chartData = {
        labels: dateLabels,
        datasets: [
            {
                data: actuals,
                fill: true,
                backgroundCor: `rgba(${hexToRGB(tailwindConfig().theme.colors.green[600])}, 0.08)`,
                borderColor: tailwindConfig().theme.colors.green[500],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: tailwindConfig().theme.colors.green[500],
                clip: 20,
            },
            {
                data: forecasts,
                fill: true,
                backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.yellow[600])}, 0.08)`,
                borderColor: tailwindConfig().theme.colors.yellow[500],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: tailwindConfig().theme.colors.yellow[500],
                clip: 20,
            }
        ],
    };
    const [chartKey, setChartKey] = useState(0);

    useEffect(() => {
        //        console.log()
        //        console.log()
        //        console.log(dateLabels)

        if (dateLabels !== null) {
            chartData.labels = dateLabels.map(dateStr => new Date(dateStr).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }))
        }
        chartData.datasets[0].data = actuals
        chartData.datasets[1].data = [...new Array(actuals.length).fill(null), ...forecasts]
        setChartKey((prevKey) => prevKey + 1); // Add this line to update the chart key

        console.log(chartData)
    }, [forecasts, actuals, dateLabels]);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const fetchData = async () => {
        setIsLoading(true);

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                selected_series: selectedOptions,
                date_from: dateFrom,
                date_to: dateTo,
            }),
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:5000/generate-forecasts",
                requestOptions
            );
            const jsonData = await response.json();
            setActuals(jsonData['actuals'])
            setForecasts(jsonData['forecasts'])
            setDateLabels(jsonData['dates'])
            setForecastSummary(jsonData["summary"]);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
            setIsSubmitted(true);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await fetchData();
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Header heading="Lets Start Forecasting 📈"/>
            <main>
                <section
                    className="max-w-9xl p-6 mx-auto bg-yellow-600 rounded-md shadow-md mt-5 flex flex-col h-full">
                    {(!isSubmitted && !isLoading) && <>

                        <h1 className="text-xl font-bold text-white mb-5">Please enter the below
                            fields to
                            create
                            your forecasting model
                        </h1>

                        <form
                            onSubmit={handleFormSubmit} className="bg-white shadow-md rounded px-8 py-6">
                            {step === 1 && (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-3">1️⃣ Select Series</h2>
                                    <div
                                        className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4"
                                        role="alert">
                                        <p className="font-bold">Select below the exogenous factors that you'd wish
                                            to be
                                            used along with rice prices when forecasting.
                                            <br></br>
                                            If you wish to forecast prices using soley the retail price of rice
                                            (Univariate),
                                            then skip to the next part of the form
                                        </p>
                                    </div>
                                    <Select
                                        defaultValue={[SERIES_OPTIONS[0]]}
                                        isMulti
                                        name="series"
                                        options={SERIES_OPTIONS}
                                        onChange={(selectedOptions) => setSelectedOptions(selectedOptions)}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                        type="button"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                            {step === 2 && (
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">2️⃣ Date Range</h2>
                                    <div
                                        className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4"
                                        role="alert">
                                        <p className="font-bold">You may enter dates ranginng
                                            from {allowedDateRange[0]} to {allowedDateRange[1]}.
                                        </p>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="date_from">Date From
                                            Start</label>
                                        <input id="date_from" type="month" min="1996-01" max="2022-12"
                                               placeholder="YYYY-MM"
                                               required
                                               value={dateFrom}
                                               onChange={(e) => setDateFrom(e.target.value)}
                                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"/>
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="date_to">Date to End 🔚</label>
                                        <input id="date_to" type="month" min="1996-01" max="2022-12"
                                               placeholder="YYYY-MM"
                                               required
                                               value={dateTo}
                                               onChange={(e) => setDateTo(e.target.value)}
                                               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"/>
                                    </div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={handlePrev}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </form>
                    </>}
                    {isLoading && (
                        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                            <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
                                <Spinner/>
                                <p className="mt-4 text-lg text-gray-700">Generating Forecasts ♾️</p>
                            </div>
                        </div>
                    )}

                    {!isLoading && isSubmitted && (
                        <>
                            <div className="shadow-md rounded px-8 py-6 bg-white">
                                <div className="h-96 rounded-lg border-4 border-dashed border-green-600 p-10">
                                    <LineChart data={chartData} width={595} height={248}/>
                                </div>
                                <div className="mt-6 grid grid-cols-2 gap-6">
                                    <div className="px-4 py-6 bg-white rounded-lg shadow-md">
                                        <h2 className="text-lg font-medium text-gray-900 mb-4">Metrics</h2>
                                        <div className="flex items-center mb-2">
                                            <div
                                                className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">MAPE</p>
                                                <p className="text-sm font-medium text-gray-500">12.3%</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <div
                                                className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">SMAPE</p>
                                                <p className="text-sm font-medium text-gray-500">8.9%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-6 bg-white rounded-lg shadow-md">
                                        <h2 className="text-lg font-medium text-gray-900 mb-4">Forecast</h2>
                                        <p className="text-gray-600 mb-2">{forecastSummary}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default ForecastPage;
