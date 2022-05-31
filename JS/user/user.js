'use strict';
import { GetDataCoinCoingecko } from "../Service.js"

const items = document.getElementById('items');
const templateCard = document.getElementById('chart').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchData();


});

const fetchData = async () => {
    let productoLS = JSON.parse(localStorage.getItem('productos'));
    const result = productoLS.map(x => x.id)
    const res = await GetDataCoinCoingecko(result);
    crearCards(res);
}



const crearCards = listado => {
    try {
        listado.forEach(cripto => {

            templateCard.querySelector('canvas').setAttribute('id', cripto.id);
            const clone = templateCard.cloneNode(true);
            fragment.appendChild(clone);
            items.appendChild(fragment)

            const labels = [];
           
    
            const datapoints = cripto.sparkline_in_7d.price;

            for (let i = 0; i < datapoints.length; ++i) {
                labels.push(i.toString());
            }
            const data = {
                labels: labels,
                
                datasets: [
                    {
                        label: 'Valor en USD',
                        data: datapoints,
                        borderColor: '#dddbff',
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.1
                    }
                ]
            };
    
            const ctx = document.getElementById(cripto.id).getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: cripto.name,
                            borderColor: '#dddbff',
                            color: '#dddbff',
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
                            // suggestedMin: 100,
                            // suggestedMax: 00
                        }
                    }
                },
            });
    
            
        });
        
    } catch (error) {
        console.log(error);
    }




    
}
