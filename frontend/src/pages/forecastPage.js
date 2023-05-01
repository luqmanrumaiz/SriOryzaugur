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

    const [generatingForecastInProgress, setGeneratingForecastInProgress] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(true);

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
            '12-01-2022', '01-01-2023', '02-01-2023',
            '03-01-2023', '04-01-2023', '05-01-2023',
            '06-01-2023', '07-01-2023',
            ],
        datasets: [
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
            {
              data: [
                null, null, null, null, null, null, null,
                null, null, null, null, null, null, null,
                null, null, null, null, null, null, null,
                null, null, null, null, 767, 570, 767,
                808, 685, 767, 685, 685,
              ],
                fill:true,
                backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.yellow[600])}, 0.08)`,
                borderColor: tailwindConfig().theme.colors.yellow[500],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: tailwindConfig().theme.colors.red[500],
                clip: 20,
            }
        ],
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Header heading="Lets Start Forecasting 📈"/>
            <main>
                <section
                    className="max-w-9xl p-6 mx-auto bg-yellow-600 rounded-md shadow-md mt-5 flex flex-col h-full">
                    {!isSubmitted && !isLoading && <>

                    <h1 className="text-xl font-bold text-white mb-5">Please enter the below
                        fields to
                        create
                        your forecasting model
                    </h1>

                    <form
                        onSubmit={
                            async (e) => {
                                e.preventDefault()
                                setIsLoading(true);
                                console.log(isLoading)
                                const requestOptions = {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({
                                        'selected_series' : selectedOptions,
                                        'date_from': dateFrom,
                                        'date_to': dateTo
                                    })
                                };

                                let response = await fetch("http://127.0.0.1:5000/generate-forecasts",
                                                           requestOptions)

                                const jsonData = await response.json();
                                setIsLoading(false)
                                setIsSubmitted(true)
                                console.log(jsonData);
                            }
                        }
                        className="bg-white shadow-md rounded px-8 py-6">
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
                                    {...(generatingForecastInProgress ? {required: true} : {})}
                                >
                                    {generatingForecastInProgress ? (
                                        <>
                                            <svg aria-hidden="true" role="status"
                                                 className="inline w-4 h-4 mr-3 text-white animate-spin"
                                                 viewBox="0 0 100 101" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="#E5E7EB"/>
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentColor"/>
                                            </svg>
                                            <span>Loading</span>
                                        </>
                                    ) : (
                                        <span>Submit</span>
                                    )}

                                </button>
                            </div>
                        )}
                    </form>
                    </>}
                    {isLoading && (
                        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                            <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
                                <Spinner />
                                <p className="mt-4 text-lg text-gray-700">Processing your request...</p>
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
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">MAPE</p>
                                            <p className="text-sm font-medium text-gray-500">12.3%</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                                    <p className="text-gray-600 mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quisquam.</p>
                                    {/* add forecast components here */}
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
