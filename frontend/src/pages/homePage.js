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
                        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=d851ce63-0653-4935-9da8-f0229aaa6a6a&groupId=d8b0dfad-4609-45fd-9e93-bd910b8bb42f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
                        accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYmIzYzk3ZmYtMTFiNS00YjM3LTkyY2YtMTg5N2IyZDg3NjZiLyIsImlhdCI6MTY4MTM5NzUxNSwibmJmIjoxNjgxMzk3NTE1LCJleHAiOjE2ODE0MDE1NzEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUEvRzRXT3J1aDdMNVJuSEt0elhWL3FUS0FMWmQ3Vm1ncUp2akJGaGZlTHNhY3cxMU5KL2xFZ3hyZEhZRkpxY25aIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUnVtYWl6IiwiZ2l2ZW5fbmFtZSI6Ikx1cW1hbiIsImlwYWRkciI6IjExMi4xMzQuMjE2LjY4IiwibmFtZSI6Ikx1cW1hbiBSdW1haXoiLCJvaWQiOiIyZWI5NDQ1Yi1lYjYyLTQ3MDEtYjE5MC01MGRlNjExOGQ2M2EiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtOTQ5NTA2MDU1LTg2MDI0NzgxMS0xNTQyODQ5Njk4LTE2MzM3MTQiLCJwdWlkIjoiMTAwMzIwMDA3ODc1REREOCIsInJoIjoiMC5BU0VBXzVjOHU3VVJOMHVTenhpWHN0aDJhd2tBQUFBQUFBQUF3QUFBQUFBQUFBQ0dBRGsuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiOS1tZHVCY2tMeWE0UDJEMkNWZW0zbFRVQi12VGVPcHBpampiOERjX3hPTSIsInRpZCI6ImJiM2M5N2ZmLTExYjUtNGIzNy05MmNmLTE4OTdiMmQ4NzY2YiIsInVuaXF1ZV9uYW1lIjoidzE3NjE3NjdAd2VzdG1pbnN0ZXIuYWMudWsiLCJ1cG4iOiJ3MTc2MTc2N0B3ZXN0bWluc3Rlci5hYy51ayIsInV0aSI6IjFqdFlTa2N1eGtPeUNUT3Vob0dtQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.VgBL8H-OGuyqMZ6ciksESPLmHxID0GWOr94u7y8vDkUWaqj7zNIarhM4dSnjGkPgDzoH1uEJYHj1bdEWSykxeimHwLBXGWLo-7yLKQUB8l_kGKifrRBgKmLd1-rZl1xced4yMm9mWVurm34gRoek7AF7RLSk5k0nY2LMWUBFQpi3cF_UcREo6yoRLhBM1rsiGzX4ngZew0qbOgmzWyDIL0S_tUQOedRs0xyssYT8wc_CVpHyqxCql2cnrhYUnQbxKUFeAtHzrzCBkaSGZHu2fNuMaQ25NrWsmoF55iK-2P7lwpUzSkMcEA-4HAWAs99KTVAtENQ5tPsdWj3ktb28uQ",
                        //                    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYmIzYzk3ZmYtMTFiNS00YjM3LTkyY2YtMTg5N2IyZDg3NjZiLyIsImlhdCI6MTY4MDg0NjkyOCwibmJmIjoxNjgwODQ2OTI4LCJleHAiOjE2ODA4NTE0MTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFSWk1ocGxNeG83aGFNaTV0dmJrZEhHY0FZS1EyVFhMMDN3QWZQU1RISkVJTWR1K0VHNHRrdUpIR0R4WlBFRGZHIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUnVtYWl6IiwiZ2l2ZW5fbmFtZSI6Ikx1cW1hbiIsImlwYWRkciI6IjExMi4xMzQuMjIxLjk3IiwibmFtZSI6Ikx1cW1hbiBSdW1haXoiLCJvaWQiOiIyZWI5NDQ1Yi1lYjYyLTQ3MDEtYjE5MC01MGRlNjExOGQ2M2EiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtOTQ5NTA2MDU1LTg2MDI0NzgxMS0xNTQyODQ5Njk4LTE2MzM3MTQiLCJwdWlkIjoiMTAwMzIwMDA3ODc1REREOCIsInJoIjoiMC5BU0VBXzVjOHU3VVJOMHVTenhpWHN0aDJhd2tBQUFBQUFBQUF3QUFBQUFBQUFBQ0dBRGsuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiOS1tZHVCY2tMeWE0UDJEMkNWZW0zbFRVQi12VGVPcHBpampiOERjX3hPTSIsInRpZCI6ImJiM2M5N2ZmLTExYjUtNGIzNy05MmNmLTE4OTdiMmQ4NzY2YiIsInVuaXF1ZV9uYW1lIjoidzE3NjE3NjdAd2VzdG1pbnN0ZXIuYWMudWsiLCJ1cG4iOiJ3MTc2MTc2N0B3ZXN0bWluc3Rlci5hYy51ayIsInV0aSI6Im84VmtHeThiOGtTUHozVkZDNzgzQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.lij1SSBgSTWU45An4gxeKDdfFCTr7X9GoGYs7WPrnka9KPbUah4BkD_ghUyuUgo7spzc9oHFCB3KeqdfFfstxLn7VWec27D-IVkpmf3lFcicy6jsh2IOt7m1ij-IhaYJFGR-9qBaWdX-7R150gWEBzagKJVweOXPBuhMyc7PH1nlsxZLJmtCX6QELtuc1q5JBJabPjBL5sh5H0uZtk7x-xVHYj7E04UbtLVHUfNYp8DFMVOlZMTUyQLavB9WQSEmJWn5n_-iNLYVbPjNINWyl5ofh0ze5knfEiKhGRQpP6_Idc5_fK-YPHgkaxnF3k5TZIZy9ihy9S1Q2gDIK6_4uA',
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
