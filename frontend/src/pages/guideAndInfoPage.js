import React from 'react';

const GuideAndInfoPage = () => {
    return (
        <div>
            {/*<div class="flex h-screen items-center justify-center">*/}
            {/*    <div class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>*/}
            {/*</div>*/}
            <div className="antialiased text-gray-900">
                {/*<Head>*/}
                {/*    <title>Tailwind CSS Typography</title>*/}
                {/*</Head>*/}
                <div
                    className="px-4 py-10 max-w-3xl mx-auto sm:px-6 sm:py-12 lg:max-w-4xl lg:py-16 lg:px-8 xl:max-w-6xl">
                    <article className="prose lg:prose-xl">
                        <h1>What is the purpose of this project 🤔?</h1>
                        <p>
                            The goal of SriOryzaugur is to provide a platform to accurately forecast rice and paddy prices in Sri Lanka 
                        </p>
                        <br></br>
                        <h1>What are the different factors that affect rice prices in Sri Lanka 💹?</h1>
                        <p>
                            The prices of rice and paddy in Sri Lanka are largely impacted by factors such as the production levels of paddy and rice, the weather conditions that affect the productivity of the crop, demand, and supply of the crop within the country, and the import and export of the crop. In addition to this, the government policies, subsidies, and taxes also play a major role in determining the prices of rice and paddy in Sri Lanka. Furthermore, the demand from other countries and the global policies related to the crop also affect the prices of paddy and rice in Sri Lanka.
                        </p>
                        <br></br>
                        <h1>How to Generate Forecasts 📉?</h1>
                        <ol>
                            <li>Go to the <a href="/forecast">Create Forecasts Page</a></li>
                            <li>Select additional series to improve forecasting accuracy</li>
                            <li>Select a date range, the last 12 months of the filtered data with the given date will be forecasted</li>
                        </ol>
                        <br></br>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default GuideAndInfoPage;
