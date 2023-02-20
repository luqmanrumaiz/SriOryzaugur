import React from 'react';
import WelcomeBanner from '../components/home/welcomeBanner.js'

const Home = () => {
    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                {/* Welcome banner */}
                <WelcomeBanner/>
            </div>
        </div>
    );
};

export default Home;
