
'use strict';
import { GetData } from "./Service.js"

const items = document.getElementById('items');
const templateCard = document.getElementById('cards').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});


window.onload = () =>{
   
  armarGrilla();

};
const cargarDatos = async () => {
  let Filter = "BTC,ETH,XRP";
  let Currency="USD";
  let Response = await GetData(Currency , Filter);

  let criptos =[];
  console.log(Response);
  Response.forEach((element,index) => {
      let cripto = {
          nombre: element.name,
          id : element.id,
          precio: element.price,
          firstDCambio : element["1d"].volume_change,
          tapaDeMercado : element.market_cap,
          volumen : element["1d"].volume,
          imagen : element.logo_url


      }
      criptos.push(cripto);
      
  });
  
  return criptos;
};

const armarGrilla = async() => {
    let data = await cargarDatos();
    const columnDefs = [
    {headerName: 'id', field: 'id'},
    {headerName: 'Nombre', field: 'name'},
    {headerName: 'Precio', field: 'price'},
    {headerName: '1D Cambio', field: 'firstdChange'},
    /* {headerName: '7D Prediccion', field: '7dPrediction'}, */
    {headerName: 'Tapa del Mercado', field: 'marketCap'},
    {headerName: 'Volumen', field: 'volume'},
    {headerName: 'Imagen', field: 'image', cellRenderer : AgregarLogo}
    /* {headerName: '1D grafico', field: '1dChart'}, */
    /* {headerName: 'CSV Datos', field: 'csvData'}, */
    ];

  const rowsData = [];
  data.forEach((element) => {
      let rowData =  {
          id: element.id, 
          name: element.nombre, 
          price: element.precio, 
          firstdChange: element.firstDCambio, 
          marketCap : element.tapaDeMercado, 
          volume : element.volumen, 
          image: element.imagen }
      
      rowsData.push(rowData);
  })
  
 
  const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowsData
  }; 

  const eGridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(eGridDiv, gridOptions);

}

const AgregarLogo = (params) => {
    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    console.log(params.value)
    imageElement.src = params.value
    imageElement.width = 15;
    imageElement.hight = 15;
  
    
    element.appendChild(imageElement);
    
    return element;
  };


// const columnDefs = [
//   { headerName: '#', field: 'id' },
//   { headerName: 'Nombre', field: 'name' },
//   { headerName: 'Precio', field: 'price' },
//   { headerName: '1D Cambio', field: '1dChange' },
//   { headerName: '7D Prediccion', field: '7dPrediction' },
//   { headerName: 'Tapa del Mercado', field: 'marketCap' },
//   { headerName: 'Volumen', field: 'volume' },
//   { headerName: '1D grafico', field: '1dChart' },
//   { headerName: 'CSV Datos', field: 'csvData' },
// ];
// const rowData = [
//   { make: 'Toyota', model: 'Celica', price: 35000 },
//   { make: 'Ford', model: 'Mondeo', price: 32000 },
//   { make: 'Porsche', model: 'Boxter', price: 72000 }
// ];
// const gridOptions = {
//   columnDefs: columnDefs,
//   rowData: rowData
// };

// const eGridDiv = document.querySelector('#myGrid');
// new agGrid.Grid(eGridDiv, gridOptions);

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
    let Filter = "BTC,ETH,USDT,USDC";
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
    templateCard.querySelector('p').textContent = formatter.format(cripto.price);
    templateCard.querySelector('img').setAttribute("src", cripto.logo_url);

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment)
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});






