import React from 'react';
import WelcomeBanner from '../components/home/welcomeBanner.js'
import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';

const Home = () => {
    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                <WelcomeBanner/>
                <PowerBIEmbed
                    embedConfig={{
                        type: 'report',
                        id: 'fd37f4e6-755d-48d6-88d6-7684af660275',
                        embedUrl: "https://app.powerbi.com/reportEmbed?reportId=fd37f4e6-755d-48d6-88d6-7684af660275&groupId=d8b0dfad-4609-45fd-9e93-bd910b8bb42f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
                        accessToken: process.env.REACT_APP_BEARER_TOKEN,
                        tokenType: models.TokenType.Aad,
                        settings: {
                            panes: {
                                filters: {
                                    expanded: false,
                                    visible: false
                                }
                            },
                            background: models.BackgroundType.Transparent,
                        }
                    }}

                    eventHandlers={
                        new Map([
                            ['loaded', function () {
                                console.log('Report loaded');
                            }],
                            ['rendered', function () {
                                console.log('Report rendered');
                            }],
                            ['error', function (event) {
                                console.log(event.detail);
                            }]
                        ])
                    }

                    cssClassName={"Embed-container"}

                    getEmbeddedComponent={(embeddedReport) => {
                        window.report = embeddedReport;
                    }}
                />
            </div>
        </div>
    );
};

export default Home;
