
'use strict';
import { GetData } from "./Service.js"

const items = document.getElementById('items');
const templateCard = document.getElementById('cards').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

const columnDefs = [
  { headerName: '#', field: 'id' },
  { headerName: 'Nombre', field: 'name' },
  { headerName: 'Precio', field: 'price' },
  { headerName: '1D Cambio', field: '1dChange' },
  { headerName: '7D Prediccion', field: '7dPrediction' },
  { headerName: 'Tapa del Mercado', field: 'marketCap' },
  { headerName: 'Volumen', field: 'volume' },
  { headerName: '1D grafico', field: '1dChart' },
  { headerName: 'CSV Datos', field: 'csvData' },
];
const rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxter', price: 72000 }
];
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData
};

const eGridDiv = document.querySelector('#myGrid');
new agGrid.Grid(eGridDiv, gridOptions);

/* API */

// let boton = document.getElementById("datos");
// boton.addEventListener('click', async () => {
//   let Filter = "BTC,ETH,XRP";
//   let Currency = "USD";
//   let Response = await GetData(Currency, Filter);

//   console.log(Response);
// })

/* API CARDS */

const fetchData = async () => {
  try {
    let Filter = "BTC,ETH,XRP,USDT";
    let Currency = "USD";
    const res = await GetData(Currency, Filter);
    crearCards(res);
  } catch (error) {
    console.log(error);
  }
}



const crearCards = data => {
  data.forEach(cripto => {
    templateCard.querySelector('h4').textContent = cripto.currency;
    templateCard.querySelector('img').setAttribute("src", cripto.logo_url);

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment)
}


