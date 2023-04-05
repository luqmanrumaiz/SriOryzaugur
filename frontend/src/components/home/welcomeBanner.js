import React from 'react';
import {Colors} from '../../values/colors.js';

function WelcomeBanner() {
    return (
        <div className="relative bg-green-800 p-4 sm:p-6 rounded-sm overflow-hidden mb-8 shadow-md">

            {/* Background illustration */}
            <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
                <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <path id="rice-svg"
                              d="M63.21,28.21c6.58,0.51,9.65-0.9,11.18-11.13C68.36,18.68,62.04,18.97,63.21,28.21L63.21,28.21z M31.26,90.66 c7.13-2.06,9.82-4.76,7.4-16.14C32.93,78.59,26.37,81.39,31.26,90.66L31.26,90.66z M26.75,78.61c7.13-2.06,9.82-4.76,7.4-16.14 C28.42,66.54,21.87,69.33,26.75,78.61L26.75,78.61z M22.32,66.8c6.34-1.83,8.73-4.23,6.58-14.35C23.8,56.07,17.97,58.55,22.32,66.8 L22.32,66.8z M18.37,56.3c5.63-1.62,7.75-3.76,5.84-12.74C19.69,46.78,14.52,48.98,18.37,56.3L18.37,56.3z M14.88,46.98 c5.24-1.51,7.22-3.5,5.44-11.87C16.11,38.11,11.29,40.16,14.88,46.98L14.88,46.98z M10.31,40.07c-6.04-1.48-8.43-5.79-5.38-14.29 C8.2,27.29,15.81,32.34,10.31,40.07L10.31,40.07z M28.19,91.81c-6.73,3.13-10.53,2.85-16.18-7.33 C19.01,83.8,25.79,81.6,28.19,91.81L28.19,91.81z M23.68,79.76c-6.73,3.13-10.53,2.85-16.18-7.33 C14.5,71.75,21.28,69.55,23.68,79.76L23.68,79.76z M19.28,67.93c-5.99,2.78-9.36,2.54-14.38-6.51 C11.12,60.81,17.15,58.86,19.28,67.93L19.28,67.93z M15.37,57.43c-5.31,2.47-8.31,2.25-12.77-5.78 C8.12,51.1,13.48,49.37,15.37,57.43L15.37,57.43z M11.89,48.1C6.94,50.4,4.15,50.19,0,42.71C5.14,42.21,10.13,40.6,11.89,48.1 L11.89,48.1z M91.62,90.97c-7.13-2.06-9.82-4.76-7.4-16.14C89.95,78.9,96.51,81.69,91.62,90.97L91.62,90.97z M96.13,78.92 c-7.13-2.06-9.82-4.76-7.4-16.14C94.46,66.85,101.01,69.64,96.13,78.92L96.13,78.92z M100.56,67.11 c-6.34-1.83-8.73-4.23-6.58-14.35C99.08,56.38,104.91,58.86,100.56,67.11L100.56,67.11z M104.51,56.61 c-5.63-1.62-7.75-3.76-5.84-12.74C103.19,47.08,108.36,49.29,104.51,56.61L104.51,56.61z M108,47.29 c-5.24-1.51-7.22-3.5-5.44-11.87C106.77,38.42,111.59,40.47,108,47.29L108,47.29z M112.57,40.38c6.04-1.48,8.43-5.79,5.38-14.29 C114.68,27.59,107.07,32.65,112.57,40.38L112.57,40.38z M94.69,92.11c6.73,3.13,10.53,2.85,16.18-7.33 C103.87,84.1,97.09,81.91,94.69,92.11L94.69,92.11z M99.2,80.06c6.73,3.13,10.53,2.85,16.18-7.33 C108.38,72.05,101.6,69.86,99.2,80.06L99.2,80.06z M103.6,68.24c5.99,2.78,9.36,2.54,14.38-6.51 C111.76,61.12,105.73,59.17,103.6,68.24L103.6,68.24z M107.51,57.73c5.31,2.47,8.31,2.25,12.77-5.78 C114.76,51.41,109.4,49.68,107.51,57.73L107.51,57.73z M110.99,48.4c4.95,2.3,7.74,2.1,11.89-5.38 C117.74,42.52,112.75,40.9,110.99,48.4L110.99,48.4z M59.42,89.48c0-1.06,0.86-1.91,1.91-1.91c1.06,0,1.91,0.86,1.91,1.91v23.38 c0,1.06-0.86,1.91-1.91,1.91c-1.06,0-1.91-0.86-1.91-1.91V89.48L59.42,89.48z M30.3,97.29c-0.4-0.98,0.08-2.09,1.05-2.49 c0.98-0.4,2.09,0.08,2.49,1.05c0.77,1.9,1.64,3.74,2.51,5.58c1.74,3.69,3.5,7.41,4.52,11.55c0.25,1.02-0.38,2.06-1.41,2.3 c-1.02,0.25-2.06-0.38-2.3-1.41c-0.92-3.74-2.6-7.29-4.26-10.82C31.99,101.14,31.09,99.22,30.3,97.29L30.3,97.29z M88.73,95.86 c0.4-0.98,1.51-1.45,2.49-1.05c0.98,0.4,1.45,1.51,1.05,2.49c-0.78,1.93-1.69,3.85-2.6,5.78c-1.72,3.64-3.45,7.31-4.35,11.2 c-0.24,1.03-1.26,1.67-2.29,1.44c-1.03-0.24-1.67-1.26-1.44-2.29c0.99-4.3,2.81-8.16,4.62-11.98 C87.09,99.59,87.96,97.75,88.73,95.86L88.73,95.86z M59.31,84.6c-8.95,0.69-13.13-1.23-15.21-15.14 C52.31,71.64,60.91,72.03,59.31,84.6L59.31,84.6z M59.31,69.04c-8.95,0.69-13.13-1.23-15.21-15.14 C52.31,56.09,60.91,56.48,59.31,69.04L59.31,69.04z M59.33,53.8c-7.96,0.62-11.68-1.09-13.53-13.46 C53.1,42.28,60.75,42.62,59.33,53.8L59.33,53.8z M59.35,40.24c-7.06,0.55-10.36-0.97-12.01-11.95 C53.82,30.02,60.61,30.32,59.35,40.24L59.35,40.24z M59.36,28.21c-6.58,0.51-9.65-0.9-11.18-11.13 C54.21,18.68,60.54,18.97,59.36,28.21L59.36,28.21z M61.6,18.45C67.81,14.22,68.69,8.32,61.64,0C58.58,3.08,52.1,12.03,61.6,18.45 L61.6,18.45z M63.27,84.6c8.95,0.69,13.13-1.23,15.21-15.14C70.27,71.64,61.66,72.03,63.27,84.6L63.27,84.6z M63.27,69.04 c8.95,0.69,13.13-1.23,15.21-15.14C70.27,56.09,61.66,56.48,63.27,69.04L63.27,69.04z M63.24,53.8 c7.96,0.62,11.68-1.09,13.53-13.46C69.47,42.28,61.82,42.62,63.24,53.8L63.24,53.8z M63.22,40.24c7.06,0.55,10.36-0.97,12.01-11.95 C68.75,30.02,61.96,30.32,63.22,40.24L63.22,40.24z"/>
                        <path id="rice-svg"
                              d="M63.21,28.21c6.58,0.51,9.65-0.9,11.18-11.13C68.36,18.68,62.04,18.97,63.21,28.21L63.21,28.21z M31.26,90.66 c7.13-2.06,9.82-4.76,7.4-16.14C32.93,78.59,26.37,81.39,31.26,90.66L31.26,90.66z M26.75,78.61c7.13-2.06,9.82-4.76,7.4-16.14 C28.42,66.54,21.87,69.33,26.75,78.61L26.75,78.61z M22.32,66.8c6.34-1.83,8.73-4.23,6.58-14.35C23.8,56.07,17.97,58.55,22.32,66.8 L22.32,66.8z M18.37,56.3c5.63-1.62,7.75-3.76,5.84-12.74C19.69,46.78,14.52,48.98,18.37,56.3L18.37,56.3z M14.88,46.98 c5.24-1.51,7.22-3.5,5.44-11.87C16.11,38.11,11.29,40.16,14.88,46.98L14.88,46.98z M10.31,40.07c-6.04-1.48-8.43-5.79-5.38-14.29 C8.2,27.29,15.81,32.34,10.31,40.07L10.31,40.07z M28.19,91.81c-6.73,3.13-10.53,2.85-16.18-7.33 C19.01,83.8,25.79,81.6,28.19,91.81L28.19,91.81z M23.68,79.76c-6.73,3.13-10.53,2.85-16.18-7.33 C14.5,71.75,21.28,69.55,23.68,79.76L23.68,79.76z M19.28,67.93c-5.99,2.78-9.36,2.54-14.38-6.51 C11.12,60.81,17.15,58.86,19.28,67.93L19.28,67.93z M15.37,57.43c-5.31,2.47-8.31,2.25-12.77-5.78 C8.12,51.1,13.48,49.37,15.37,57.43L15.37,57.43z M11.89,48.1C6.94,50.4,4.15,50.19,0,42.71C5.14,42.21,10.13,40.6,11.89,48.1 L11.89,48.1z M91.62,90.97c-7.13-2.06-9.82-4.76-7.4-16.14C89.95,78.9,96.51,81.69,91.62,90.97L91.62,90.97z M96.13,78.92 c-7.13-2.06-9.82-4.76-7.4-16.14C94.46,66.85,101.01,69.64,96.13,78.92L96.13,78.92z M100.56,67.11 c-6.34-1.83-8.73-4.23-6.58-14.35C99.08,56.38,104.91,58.86,100.56,67.11L100.56,67.11z M104.51,56.61 c-5.63-1.62-7.75-3.76-5.84-12.74C103.19,47.08,108.36,49.29,104.51,56.61L104.51,56.61z M108,47.29 c-5.24-1.51-7.22-3.5-5.44-11.87C106.77,38.42,111.59,40.47,108,47.29L108,47.29z M112.57,40.38c6.04-1.48,8.43-5.79,5.38-14.29 C114.68,27.59,107.07,32.65,112.57,40.38L112.57,40.38z M94.69,92.11c6.73,3.13,10.53,2.85,16.18-7.33 C103.87,84.1,97.09,81.91,94.69,92.11L94.69,92.11z M99.2,80.06c6.73,3.13,10.53,2.85,16.18-7.33 C108.38,72.05,101.6,69.86,99.2,80.06L99.2,80.06z M103.6,68.24c5.99,2.78,9.36,2.54,14.38-6.51 C111.76,61.12,105.73,59.17,103.6,68.24L103.6,68.24z M107.51,57.73c5.31,2.47,8.31,2.25,12.77-5.78 C114.76,51.41,109.4,49.68,107.51,57.73L107.51,57.73z M110.99,48.4c4.95,2.3,7.74,2.1,11.89-5.38 C117.74,42.52,112.75,40.9,110.99,48.4L110.99,48.4z M59.42,89.48c0-1.06,0.86-1.91,1.91-1.91c1.06,0,1.91,0.86,1.91,1.91v23.38 c0,1.06-0.86,1.91-1.91,1.91c-1.06,0-1.91-0.86-1.91-1.91V89.48L59.42,89.48z M30.3,97.29c-0.4-0.98,0.08-2.09,1.05-2.49 c0.98-0.4,2.09,0.08,2.49,1.05c0.77,1.9,1.64,3.74,2.51,5.58c1.74,3.69,3.5,7.41,4.52,11.55c0.25,1.02-0.38,2.06-1.41,2.3 c-1.02,0.25-2.06-0.38-2.3-1.41c-0.92-3.74-2.6-7.29-4.26-10.82C31.99,101.14,31.09,99.22,30.3,97.29L30.3,97.29z M88.73,95.86 c0.4-0.98,1.51-1.45,2.49-1.05c0.98,0.4,1.45,1.51,1.05,2.49c-0.78,1.93-1.69,3.85-2.6,5.78c-1.72,3.64-3.45,7.31-4.35,11.2 c-0.24,1.03-1.26,1.67-2.29,1.44c-1.03-0.24-1.67-1.26-1.44-2.29c0.99-4.3,2.81-8.16,4.62-11.98 C87.09,99.59,87.96,97.75,88.73,95.86L88.73,95.86z M59.31,84.6c-8.95,0.69-13.13-1.23-15.21-15.14 C52.31,71.64,60.91,72.03,59.31,84.6L59.31,84.6z M59.31,69.04c-8.95,0.69-13.13-1.23-15.21-15.14 C52.31,56.09,60.91,56.48,59.31,69.04L59.31,69.04z M59.33,53.8c-7.96,0.62-11.68-1.09-13.53-13.46 C53.1,42.28,60.75,42.62,59.33,53.8L59.33,53.8z M59.35,40.24c-7.06,0.55-10.36-0.97-12.01-11.95 C53.82,30.02,60.61,30.32,59.35,40.24L59.35,40.24z M59.36,28.21c-6.58,0.51-9.65-0.9-11.18-11.13 C54.21,18.68,60.54,18.97,59.36,28.21L59.36,28.21z M61.6,18.45C67.81,14.22,68.69,8.32,61.64,0C58.58,3.08,52.1,12.03,61.6,18.45 L61.6,18.45z M63.27,84.6c8.95,0.69,13.13-1.23,15.21-15.14C70.27,71.64,61.66,72.03,63.27,84.6L63.27,84.6z M63.27,69.04 c8.95,0.69,13.13-1.23,15.21-15.14C70.27,56.09,61.66,56.48,63.27,69.04L63.27,69.04z M63.24,53.8 c7.96,0.62,11.68-1.09,13.53-13.46C69.47,42.28,61.82,42.62,63.24,53.8L63.24,53.8z M63.22,40.24c7.06,0.55,10.36-0.97,12.01-11.95 C68.75,30.02,61.96,30.32,63.22,40.24L63.22,40.24z"/>

                        <path id="gg" d="M40 0l40 80-40-12.5L0 80z"/>
                        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
                            <stop stopColor={Colors.primary} offset="0%"/>
                            <stop stopColor={Colors.secondary} offset="100%"/>
                        </linearGradient>
                        <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
                            <stop stopColor={Colors.primary} offset="0%"/>
                            <stop stopColor={Colors.secondary} stopOpacity="0" offset="100%"/>
                        </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <g transform="rotate(64 36.592 105.604)">
                            <mask id="welcome-d" fill="#fff">
                                <use xlinkHref="#rice-svg"/>
                            </mask>
                            <use fill="url(#welcome-b)" xlinkHref="#rice-svg"/>
                            <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z"/>
                        </g>
                        <g transform="rotate(-51 91.324 -105.372)">
                            <mask id="welcome-f" fill="#fff">
                                <use xlinkHref="#rice-svg"/>
                            </mask>
                            <use fill="url(#welcome-b)" xlinkHref="#rice-svg"/>
                            <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z"/>
                        </g>
                        <g transform="rotate(44 61.546 392.623)">
                            <mask id="welcome-h" fill="#fff">
                                <use xlinkHref="#rice-svg"/>
                            </mask>
                            <use fill="url(#welcome-b)" xlinkHref="#rice-svg"/>
                            <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z"/>
                        </g>
                    </g>
                </svg>
            </div>

            {/* Content */}
            <div className="relative">
                <h1 className="text-2xl md:text-3xl text-white font-bold mb-1">Ayubowan 👋</h1>
                <p className="text-white	">Here is what’s happening with rice prices today:</p>
            </div>
        </div>
    );
}

export default WelcomeBanner;