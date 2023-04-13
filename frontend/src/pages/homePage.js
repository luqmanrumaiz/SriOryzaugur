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
                        accessToken: "H4sIAAAAAAAEAB1Wxw7s1g77l7t1APcWIAv33rt37r3bY3uC9-9vkO2BIEg8JMV__9jZOy5Z-efvPw00mzPt0_rtFQ-GQIR85TNKNRlCiBmVIdSwmnXRrNe2mFcp2poaRE4jBbznTTakrtfhUfvqNZwP2SKsgy389V5B4H0xsgxkznhCBm0tXufTqrJ31pyozgwmbkH7MAMnHfUMqyMUcuePTYQKtRgt1G58nuJEaCovbIJNLCRwdjZoGBsvf1uwj1SbRvPeg-FYvn5mi6fVegf0m6pYThu-nyo8LsKNP-QwO_GW5AHatOGXBj7zlPY5SFFTpuYO4hiuoi30GRvXVG3tNAAowp_RDjGNlssXjcXFW6zbU6rdMnVcnkfqMk0VDn8_LcnUZ0Yv0eP4H45XV6wfus-tyLwUPzKRR9Ytr6NHsqtfmE40lfWB9dLZG9B17rLsCmJZCcEqN4vTo1iVCoP9EtV0U5kRXrlhC-FFxLFGFpt4Cu5vqKx_Pl49ph2KJUav9E1US09R6Y1gVEl4KqFwj8pVKkOSp12qDeFas3d-Q8mgwy75iYC-YUVRXom6JtFCILKUELQ983ayLUre6ndSKUCdgGwFfIKnU-IihZP5VvRtx4mnaQ3EXvIfJRjdx5MRiRA6IxQtt8iO3B8KHvomS9hG5g_UmiCL22g9e755LnHRAoqOGJ5QxyQV1DMUuPlDHoWuNmb2g7gvReL33cvq_vFCeLsV1otULfpBdTviUXYI8VQKdu9PR8sT28_1Zlx0EWhEf6cYTHJ4psqXJUFcomYbkiqoTPHv0pE1rWPexGBJt4ibp-Pdafm3dXFuhKZeBdP15F_sogcuYiVcbDb1as_4UKTic_eig7nOqCVreCIzS6zSVs6msZn0ISu7JDeDfD2FRuPCtwaYhl8kxuH7BDIGITqg9nnFRizm0eqAy1Xj8VTojpvX0D5jTkpTEDytxFDtct4hFVp7n6ouBd8xxw76HEqxANoA2dUMJLJOAOJDVAjDWZv2CEG2GgWrTfJ4Ex-E1sh78ULWDu6db2Lac6Z7QUiJfdbwJxu6gvCRlWGQWU-7zxXC0XMkP1u0BW_uVsTBQdVYNTRRl2W9F6ucMuxW7doZTQD2_fUGpYqt4Bpv3YLYelzy0QA7VQ0qiPCWb1JZ8gIGXTfChgEBV9v10lmv5U9docEWx3T1kYGW4VP01RgJteU-MinFbuGP4Dd3l8AkyWraXOhybACqdTMf3QC-i05aQV0IdDZvU9CumGILm9o6Wli3EEAZCYxqPmoiqIdDpM42n5KBbwpyoeLlszLJBGq7ZcO3M9GPNqpeClosqB36WgROGC-2fuphpLElZ4lvc6y-1WziMjHkNy027XB51t6H3mw-QQXd8QqgEQvHEVqk9ekJLRcaz1KaLiOcNry-UbF6IBcJlqeDHRJliouJSVYPQHzDZIz43ZBIJ-C36WOcdL4_hjqPJamtUrPA5ovxwdmp6knTYM6gtKf1xJ7Vc_XEdw5_J2hi5WOseVtrKB-DMIly-MOn6CEii1Lbo4dEcLhAYY5LEfQMBeLIjFXqTsCUpd5oEQqsF-qQemin1nEk9Pi5GYK-Z884dh3KSUjoEkq_pe0I0oJK1rbLYpVEF2MXN9nNrtOZ0fqWJAKx7QvFFNYeCbXMG0phgjGVzFXEFWmeVWd-VlWFKBwH8cBcKL0t2yW32B44Wiivfw5DfFPk_T2KNws0qLix1D6BJle-8ZK-kiHiSDMTyMopunSCFd3EcjTSKaRrcH8lcSx57_Gu-obeLdLmJ5SkwiceqxrCF83v2XGouaw58R8hKDI8gjruMdQWJCiVJdPU29ZuaXCfK2F2giLPMxsBq8TT6Gn-SVu1Yqw9bM_g5CsY-hbGXNsNmS0fOQcKCErMoB7Uugngk-pZTBo5XO_zJcFGB8MqcU7_-0Gm0leCqOKyPuWeXgEzaDCYA9984RSh3gaodkKrxSNk-B2_JdZKJz2aMlw9wHpyVEiuPzelDwLA9myqmKOHIJHn3YwOSxw--ixT3ep7rcOwU5OyrH0lKUVeH1Vz3t_2eyEv62gaOQXccBZCK3CmTrbWazo9xa9kFRJfr1ei_WkQT99yMrymsai_pZbhOwscprmYwSGqjmGZA8hxroiqZ8k4lzcU2ciY4GFQ7WixV52H_IrdAQyruAQN1mLZqf2KNY_yMCUUH8l4RP3sNQWA88_-pjePO8gcipos6zH6ebJ5YYBGjiYY9raZFmEVeBIhScF0hUR9BwP0wtB7aX7yO3U6ysLeBrXTrnbgSG2lhXCiEnhiQo9BN9lb3TOmtUsu3FhP3P1S4zJrxfzghSBeC0Wa3kp9EtYVRjjbqFFWzXRUE7YD9C55va7sVW_mO26Nb8lUiu29qg4zWwM8GgZVmvFfNzkTaHzjXAVZLo0hsRDecE21cz-gnzjtdf6mx-mZylf0VTx8hi1VL4YYZl0EpOS10Ne1yEk0njLht6b0TjIbXx3cPhhsDcqcM684hp198Brvqy_-ecxKS5a7cDaWNCCoLuqz-7Fb5ugJXtPmi4R1yCy2Tif8wrRx8lABn2bxZISdbxZ9Z4hDAHqzd-RFBbPmZO752E4_3Il6PmXv8BkveWZ-rQ_8rCJ_klW33-dxEPe6WlCGnLTwwnWSk2HuRKUk6se6JJ_cewluR1npDHKxLHGft6GcTfOpGS9jURFs7Sa3HfO0_m1q9UbwlQ1TCJRiDdBgEBBZDG0Oo288DriCIblNO1E2D-t8g5ME_axmjxdAb3UPmsKXaF3O5qmJeuRtjXsA8eGOq-rPqcYEcmmsUZyPZ9Kq4p8_f_3h9nc9F616f9HVlF6JyTybgj-qPFluYtTeLoboU0ACVPifVp87NbLp8pp56Lp0rdbyjGlQzgZ57cjvR_n9tlYErx4BK7otaRcxzW8IUBgZNRQC6Fuce1160Uc6BFkaqEkaBO2LGtyP0YdpuzbafcAeRsphEChA8B7Cj-ZjmCCJA36Wpa_y_PA4do2e58tHr0gLXY---ruHSUq-1fIwLfQLciWjJDUn_K56F27psI6XbGUfkiou6W5xUOqStxkUOKDqDTsk-f5AaDwpVTpXVMsb5F0a2iU0VpuzNr51Jcum5mSg7b7VvxYkRvC7QQBw9-k5BfkaqZqmQA4z1lfBnpmgo5dy3mNUGZnTX4Ry_vkP5ndtq10JfygbRUyxgQzbvbM74Yw5DmGFzH9VXtfM2Xnt1a8saiAa1z6_DFcU1JDfqcTeY8ppsVB-sqp8u69t5U-Srqyg3D7NzaQS0JGhtmrgQbwTXOkNPeVCQzydqF5QgoOWAJCDmst3FMvAZF0jVCqvwpfumuDxsFBYHe2YM3mnlMKpUDy6o5ilVMsvd724atiZyQTDFGdxTTBqbKsP-O6HmL7qFPbKdk4DWT5uiag89Jo4DEPEiLRIxEmwc1zW5gb6j0lhxh2OSmWh9gUi5runrvBSfgM0FQOhpLfDk6UWM1xbJgqxpcEmH6BqGNEedLRqg7tmV3O0F9R236EUeBcTXBFIKNBtmfQLkjER1OzLa2IYZD5xuCnRab_DpAI48YUNy2qaH8z_-z_fOclSrg0AAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImV4cCI6MTY4MDg1MjI5OSwiYWxsb3dBY2Nlc3NPdmVyUHVibGljSW50ZXJuZXQiOnRydWV9",
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
