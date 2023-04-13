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
                    <article class="prose lg:prose-xl">
                        <h1>What is the purpose of this project?</h1>
                        <p>
                            The goal of SriOryzaugur is to provide a platform to accurately forecast rice and paddy prices in Sri Lanka 
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default GuideAndInfoPage;
