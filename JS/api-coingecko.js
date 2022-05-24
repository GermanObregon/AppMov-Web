'use strict';
import { GetDataCoinCoingecko } from "./Service.js"
let suggestions;

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const fetchData = async () => {
    try {
        const res = await GetDataCoinCoingecko('roi');
        suggestions = res.prices.map(d => d[1]);
        

        const DATA_COUNT = 153;
const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
    labels.push(i.toString());
}
const datapoints = suggestions;
const data = {
    labels: labels,
    datasets: [
        {
            label: 'Cubic interpolation (monotone)',
            data: datapoints,
            borderColor: '#07083e',
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
        }
    ]
};

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Cubic interpolation mode'
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                },
                suggestedMin: 0.01,
                suggestedMax: 0.02
            }
        }
    },
})
    } catch (error) {
        console.log(error);
    }
}

