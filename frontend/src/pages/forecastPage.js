import React, {useEffect, useRef, useState} from 'react';

import Header from '../components/pages/header.js'
import Select from 'react-select'
import Papa from "papaparse";

import {SERIES_OPTIONS} from '../values/constants';

const ForecastPage = () => {

    const [step, setStep] = useState(1);
    const [uploadDataError, setUploadDataError] = useState(false)
    const [uploadDataErrorText, setUploadDataErrorText] = useState("There was an error when importing the data you provided.")
    const [selectedOptions, setSelectedOptions] = useState(["Price"]);
    const [generatingForecastInProgress, setGeneratingForecastInProgress] = useState(false)

    const fileInputRef = useRef(null);

    const handleChange = () => {
        if (step === 1) {
//            const selectedFiles = fileInputRef.current.files;
//            if (selectedFiles.length === 0) {
//                alert("No file selected");
//            } else {
//                // Access the selected file(s) using selectedFiles property
//                // Perform further actions with the file(s) here
//                alert(`File(s) selected: ${selectedFiles.length}`);
//            }
        }
    };

    const handleNext = () => {
        handleChange()
        setStep(step + 1);
    };

    const handlePrev = () => {
        handleChange()
        setStep(step - 1);
    };

    const handleSelectChange = (selectedOptions) => {
        // Update the state with the selected options
        console.log(selectedOptions)

        let optionLabels = []
        selectedOptions.forEach(getLabelsFromOptions);

        function getLabelsFromOptions(item, index) {
            optionLabels.push(item.label)
        }

        console.log(optionLabels)

        setSelectedOptions(optionLabels);
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
                    className="max-w-9xl p-6 mx-auto bg-yellow-600 rounded-md shadow-md mt-5 flex flex-col h-full">
                    <h1 className="text-xl font-bold text-white dark:text-white mb-5">Please enter the below fields to
                        create
                        your forecasting model</h1>
                    <form
                        onSubmit={
                            async (e) => {
                        const requestOptions = {
                            method: 'GET',
                            headers: {'Content-Type': 'application/json'},
                        };
                        let response = await fetch("http://127.0.0.1:5000/long-process",
                                                   requestOptions)

                                const jsonData = await response.json();
                        console.log(jsonData);
                            }
                        }
                        className="bg-white shadow-md rounded px-8 py-6">
                        {step === 2 && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">2️⃣ Import Additional Data</h2>
                                <div
                                    className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4"
                                    role="alert">
                                    <p className="font-bold">Make sure you enter the additional rows in a csv
                                        file. <br></br>If you do not wish to import any additional data, you may
                                        continue without
                                        importing a CSV with additional rows</p>
                                </div>
                                {uploadDataError && (
                                    <div
                                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3"
                                        role="alert">
                                        <strong className="font-bold">{uploadDataErrorText}!</strong>
                                    </div>
                                )
                                }
                                <div className="mb-4">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={async (e) => {
                                            const files = e.target.files;
                                            if (files) {
                                                Papa.parse(files[0], {
                                                        ...commonConfig,
                                                        complete: async function (results) {
                                                            const requestOptions = {
                                                                method: 'POST',
                                                                headers: {'Content-Type': 'application/json'},
                                                                body: JSON.stringify({
                                                                    "uploaded_file_data": results.data.slice(0, -1),
                                                                    "selected_series": selectedOptions
                                                                })
                                                            };
                                                            let response = await fetch("http://127.0.0.1:5000/validate-additional-data",
                                                                requestOptions)

                                                            const jsonData = await response.json();
                                                            console.log(jsonData);

                                                            setUploadDataError(!jsonData.success)
                                                            if (!jsonData.success) {
                                                                console.log(jsonData.message)
                                                                setUploadDataErrorText(jsonData.message)
                                                            }
                                                        }
                                                    }
                                                )
                                            }
                                        }}
                                    />
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
                                <h2 className="text-2xl font-semibold mb-4">3️⃣
                                    Date Range</h2>
                                <div className="mb-5">
                                    <label htmlFor="date_from">Date From
                                        Start</label>
                                    <input id="date_from" type="month" min="2020-01" max="2023-12" placeholder="YYYY-MM"
                                           required
                                           className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="date_to">Date to End 🔚</label>
                                    <input id="date_to" type="month" min="2020-01" max="2023-12" placeholder="YYYY-MM"
                                           required
                                           className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
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
                                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        {step === 1 && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">1️⃣ Select Series</h2>
                                <div
                                    className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4"
                                    role="alert">
                                    <p className="font-bold">Select below the exogenous factors that you'd wish to be
                                        used along with rice prices when forecasting.</p>
                                </div>
                                <Select
                                    defaultValue={[SERIES_OPTIONS[0]]}
                                    isMulti
                                    name="series"
                                    options={SERIES_OPTIONS}
                                    onChange={handleSelectChange}
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
