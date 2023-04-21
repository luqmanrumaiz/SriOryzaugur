import React from 'react';
import WelcomeBanner from '../components/home/welcomeBanner.js'
import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';

const Home = () => {
    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                {/* Welcome banner */}
                <WelcomeBanner/>
                <PowerBIEmbed
                    embedConfig={{
                    type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                        id: 'd851ce63-0653-4935-9da8-f0229aaa6a6a',
                        "embedUrl": "https://app.powerbi.com/reportEmbed?reportId=ade65e7c-0fef-4497-8607-52e8e8c8b39a&groupId=d8b0dfad-4609-45fd-9e93-bd910b8bb42f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",                        accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYmIzYzk3ZmYtMTFiNS00YjM3LTkyY2YtMTg5N2IyZDg3NjZiLyIsImlhdCI6MTY4MTc0MTA2NSwibmJmIjoxNjgxNzQxMDY1LCJleHAiOjE2ODE3NDU5OTUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFNRHlFOGhudEErSHN1T2pHb0gwR0RNRzFYdWdqTUZTUE1qSXp0aW9pdXlQU1ZsejVNZ0Q1cmtsOUJGVExpaUNWIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUnVtYWl6IiwiZ2l2ZW5fbmFtZSI6Ikx1cW1hbiIsImlwYWRkciI6IjExMi4xMzQuMjE4LjEzNSIsIm5hbWUiOiJMdXFtYW4gUnVtYWl6Iiwib2lkIjoiMmViOTQ0NWItZWI2Mi00NzAxLWIxOTAtNTBkZTYxMThkNjNhIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTk0OTUwNjA1NS04NjAyNDc4MTEtMTU0Mjg0OTY5OC0xNjMzNzE0IiwicHVpZCI6IjEwMDMyMDAwNzg3NURERDgiLCJyaCI6IjAuQVNFQV81Yzh1N1VSTjB1U3p4aVhzdGgyYXdrQUFBQUFBQUFBd0FBQUFBQUFBQUNHQURrLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IjktbWR1QmNrTHlhNFAyRDJDVmVtM2xUVUItdlRlT3BwaWpqYjhEY194T00iLCJ0aWQiOiJiYjNjOTdmZi0xMWI1LTRiMzctOTJjZi0xODk3YjJkODc2NmIiLCJ1bmlxdWVfbmFtZSI6IncxNzYxNzY3QHdlc3RtaW5zdGVyLmFjLnVrIiwidXBuIjoidzE3NjE3NjdAd2VzdG1pbnN0ZXIuYWMudWsiLCJ1dGkiOiJfYUM1cGZ5X0YwV2VJNGk4Z2d0SEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.F4h6-ciEbYai4SdYuVyqUfB6usSNeyNtkqqUpVKhdIml7GMxEiN9UVIjtoYp4asjt5iK697q2OR430D66w0fB30AA9yYdpmxZa1Mruq6EebQzQlTXxOlvw1u0yphAH2QPkb3mhnCeeh8ZCwkbkM7_C5dT22-PEPNiEZ04pirSfQ5ADEUnLHIFY6W-qkQjwN_098YXQr27KhikJckqm60_PC_mrUGvIwALX1YvgYpZ5-OzIksqyu0Wn-gQp0CUIfnXzopCQSoL5aFYPzWoVbZMPYyRS6V-7m1cRpnyKIiSeousqgOUV32RrfxWajkN6-Q1I-TMpQS1WICapXpKtgXPA',
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
