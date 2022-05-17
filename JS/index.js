const columnDefs = [
  {headerName: '#', field: 'id'},
  {headerName: 'Nombre', field: 'name'},
  {headerName: 'Precio', field: 'price'},
  {headerName: '1D Cambio', field: '1dChange'},
  {headerName: '7D Prediccion', field: '7dPrediction'},
  {headerName: 'Tapa del Mercado', field: 'marketCap'},
  {headerName: 'Volumen', field: 'volume'},
  {headerName: '1D grafico', field: '1dChart'},
  {headerName: 'CSV Datos', field: 'csvData'},
];
const rowData = [
  {make: 'Toyota', model: 'Celica', price: 35000},
  {make: 'Ford', model: 'Mondeo', price: 32000},
  {make: 'Porsche', model: 'Boxter', price: 72000}
];
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData
};

const eGridDiv = document.querySelector('#myGrid');
new agGrid.Grid(eGridDiv, gridOptions);

'use strict';
import {GetData} from "./Service.js"

let boton = document.getElementById("datos");
boton.addEventListener('click' , async () => {
    let Filter = "BTC,ETH,XRP";
    let Currency="USD";
    let Response = await GetData(Currency , Filter);
    
    console.log(Response);
})


    
