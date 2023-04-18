import React, {useEffect, useState} from 'react';

import Header from '../components/pages/header.js'
import Select from 'react-select'
import Papa from "papaparse";

import { SERIES_OPTIONS } from '../values/constants';

const ForecastPage = () => {

    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const {name, value} = e.target;
//        setFormData({...formData, [name]: value});
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const commonConfig = {delimiter: ","};

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

                <section
                    className="max-w-9xl p-6 mx-auto bg-yellow-600 rounded-md shadow-md dark:bg-gray-800 mt-5 flex flex-col h-full">
                    <h1 className="text-xl font-bold text-white dark:text-white mb-5">Please enter the below fields to
                        create
                        your forecasting model</h1>
                    <form className="bg-white shadow-md rounded px-8 py-6">
                        {step === 2 && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">2️⃣ Import Additional Data</h2>
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        accept=".csv,.xlsx,.xls"
                                        onChange={async (e) => {
                                            const files = e.target.files;
                                            console.log(files);
                                            if (files) {
                                                console.log(files[0]);
                                                Papa.parse(files[0], {
                                                        ...commonConfig,
                                                        complete: async function (results) {
                                                            console.log("Finished:", results.data.slice(0, -1));
                                                            const requestOptions = {
                                                                method: 'POST',
                                                                headers: {'Content-Type': 'application/json'},
                                                                body: JSON.stringify(results.data.slice(0, -1))
                                                            };
                                                            await fetch("http://127.0.0.1:5000/generate-forecasts", requestOptions)
                                                        }
                                                    }
                                                )
                                            }

                                        }}
                                    />
                                </div>
                                <div
                                    className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 mb-3"
                                    role="alert">
                                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20">
                                        <path
                                            d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/>
                                    </svg>
                                    <p>If you do not wish to import any additional data, you may continue without
                                        importing a CSV with additional rows</p>
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
                                    type="button"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">3️⃣ Select Date Range</h2>
                                <div className="mb-5">
                                    <label className="dark:text-gray-200" htmlFor="date_from">Date From
                                        Start</label>
                                    <input id="date_from" type="month" min="2020-01" max="2023-12" placeholder="YYYY-MM"
                                           required
                                           className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                                </div>
                                <div className="mb-5">
                                    <label className="dark:text-gray-200" htmlFor="date_to">Date to End 🔚</label>
                                    <input id="date_to" type="month" min="2020-01" max="2023-12" placeholder="YYYY-MM"
                                           required
                                           className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
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
                        {step === 1 && (
                            <div>
                                <h2 className="text-2xl font-semibold">1️⃣ Select Series</h2>
                                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">Password
                                    Confirmation</label>
                                <Select
                                    defaultValue={[SERIES_OPTIONS[0]]}
                                    isMulti
                                    name="series"
                                    options={SERIES_OPTIONS}
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
                    </form>
                </section>
            </main>
        </div>
    );
};

export default ForecastPage;
