
'use strict';
import { GetData } from "./Service.js"

const items = document.getElementById('items');
const templateCard = document.getElementById('cards').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});



const cargarDatos = async () => {
  let Filter = "BTC,ETH,XRP";
  let Currency = "USD";
  let Response = await GetData(Currency);

  let criptos = [];
  Response.forEach((element, index) => {
    let cripto = {
      nombre: element.name,
      id: element.id,
      precio: element.price,
      firstDCambio: element["1d"].volume_change,
      tapaDeMercado: element.market_cap,
      volumen: element["1d"].volume,
      imagen: element.logo_url


    }
    criptos.push(cripto);

  });

  return criptos;
};

const armarGrilla = async () => {
  let data = await cargarDatos();
  const columnDefs = [
    { headerName: 'id', field: 'id' },
    { headerName: 'Nombre', field: 'name' },
    { headerName: 'Precio', field: 'price' },
    { headerName: '1D Cambio', field: 'firstdChange' },
    { headerName: 'Tapa del Mercado', field: 'marketCap' },
    { headerName: 'Volumen', field: 'volume' },
    { headerName: 'Imagen', field: 'image', cellRenderer: AgregarLogo },
    { headerName: 'Favorito', field: 'Registered', cellRenderer: CheckboxRenderer }
  ];

  const rowsData = [];
  data.forEach((element) => {
    let rowData = {
      id: element.id,
      name: element.nombre,
      price: element.precio,
      firstdChange: element.firstDCambio,
      marketCap: element.tapaDeMercado,
      volume: element.volumen,
      image: element.imagen
    }

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
  imageElement.src = params.value
  imageElement.width = 15;
  imageElement.hight = 15;


  element.appendChild(imageElement);

  return element;
};

function CheckboxRenderer() { }

CheckboxRenderer.prototype.init = function (params) {
  this.params = params;

  this.eGui = document.createElement('input');
  this.eGui.type = 'checkbox';
  this.eGui.checked = params.value;

  this.checkedHandler = this.checkedHandler.bind(this);
  this.eGui.addEventListener('click', this.checkedHandler);
}

CheckboxRenderer.prototype.checkedHandler = function (e) {
  let checked = e.target.checked;
  let colId = this.params.column.colId;
  this.params.node.setDataValue(colId, checked);
  if (checked === true) {
    alert("Agregado a Favoritos");

  }

}

CheckboxRenderer.prototype.getGui = function (params) {
  return this.eGui;
}

CheckboxRenderer.prototype.destroy = function (params) {
  this.eGui.removeEventListener('click', this.checkedHandler);
}


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
    templateCard.querySelector('button').setAttribute('data-id', cripto.id);
    templateCard.querySelector('h4').textContent = cripto.currency;
    templateCard.querySelector('p.text--medium').textContent = formatter.format(cripto.price);
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
