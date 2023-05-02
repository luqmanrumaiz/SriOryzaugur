import React, { useRef, useEffect } from 'react';
import {
    Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

import { tailwindConfig, formatDate, formatLKR } from '../../utils/utils.js';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function LineChart({
    data,
    width,
    height
}) {

    const canvas = useRef(null);

    useEffect(() => {
        const ctx = canvas.current;
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                chartArea: {
                    backgroundColor: tailwindConfig().theme.colors.slate[50],
                },
                layout: {
                    padding: 20,
                },
                scales: {
                    y: {
                        display: true,
                        beginAtZero: true,
                    },
                    x: {
                        type: 'time',
                        time: {
                            parser: 'MM-DD-YYYY',
                            unit: 'month',
                        },
                        display: true,
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: () => false,
                            label: (context) => {
                                const date = formatDate(context.parsed.x);
                                const value = formatLKR(context.parsed.y);
                                return `${date}: ${value}`;
                            },
                        },
                    },
                    legend: {
                        display: true,
                    },
                },
                interaction: {
                    intersect: false,
                    mode: 'nearest',
                },
                maintainAspectRatio: false,
                resizeDelay: 200,
            },
        });
        return () => chart.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
            <canvas ref={canvas} width={width} height={height}></canvas>
            );
}

export default LineChart;