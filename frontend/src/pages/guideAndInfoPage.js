import React from 'react';
import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';

const GuideAndInfoPage = () => {
    return (
        <div>
            <PowerBIEmbed
                embedConfig={{
                    type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                    id: 'd851ce63-0653-4935-9da8-f0229aaa6a6a',
                    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=d851ce63-0653-4935-9da8-f0229aaa6a6a&groupId=d8b0dfad-4609-45fd-9e93-bd910b8bb42f&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
                    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYmIzYzk3ZmYtMTFiNS00YjM3LTkyY2YtMTg5N2IyZDg3NjZiLyIsImlhdCI6MTY4MDc4MzQxNywibmJmIjoxNjgwNzgzNDE3LCJleHAiOjE2ODA3ODc0OTksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUE2QUY2b3Rsa2ZRSzJEcEpZWTQzRnRmWkh4QnZ5emEwUGM1cDh1aU4wSUdGZHlyTUMyTVJSK1JWM0YwMGUwR1cwIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUnVtYWl6IiwiZ2l2ZW5fbmFtZSI6Ikx1cW1hbiIsImlwYWRkciI6IjExMi4xMzQuMjE5LjEzNSIsIm5hbWUiOiJMdXFtYW4gUnVtYWl6Iiwib2lkIjoiMmViOTQ0NWItZWI2Mi00NzAxLWIxOTAtNTBkZTYxMThkNjNhIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTk0OTUwNjA1NS04NjAyNDc4MTEtMTU0Mjg0OTY5OC0xNjMzNzE0IiwicHVpZCI6IjEwMDMyMDAwNzg3NURERDgiLCJyaCI6IjAuQVNFQV81Yzh1N1VSTjB1U3p4aVhzdGgyYXdrQUFBQUFBQUFBd0FBQUFBQUFBQUNHQURrLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6IjktbWR1QmNrTHlhNFAyRDJDVmVtM2xUVUItdlRlT3BwaWpqYjhEY194T00iLCJ0aWQiOiJiYjNjOTdmZi0xMWI1LTRiMzctOTJjZi0xODk3YjJkODc2NmIiLCJ1bmlxdWVfbmFtZSI6IncxNzYxNzY3QHdlc3RtaW5zdGVyLmFjLnVrIiwidXBuIjoidzE3NjE3NjdAd2VzdG1pbnN0ZXIuYWMudWsiLCJ1dGkiOiItaUdsanNxb3hVNnFFVmxaeGZGUEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.oonHZzIgAmMVkmx4tOk57dJUfLcZdlAdWGD2hCykVS6Jd5MkJhvE9RELmUMqNtmPj9eS3lZ1ebsNIUohhx0LdIWsJWb7zPullsGSy8G9pEZey8uTyybY08xlcrkJTZBsKw5L837e22LFcN4e65-Wj4ZfIijgGxAYpUQZTRMC7zQmwQFUWTOQasbREsyvJVCQo-EQruGcy84ZpI-7OtgsaICKeA6fRAkm9WgZCp64qysYeaW6jFWUJAvKDm2HHJouKIXEMPeEvq_PIxn3CEIrgL0qkRH32T1Llr_fenYROnYZKwYF-kNGf8kKkAEwQfPDerg-4QUX5-bD047qUwo1mQ',
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
    );
};

export default GuideAndInfoPage;
