'use strict';
import {GetData} from "./service.js";



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
    {headerName: 'Imagen', field: 'image', cellRenderer : AgregarLogo},
    {headerName: 'Favorito', field: 'Registered', cellRenderer : CheckboxRenderer}
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

function CheckboxRenderer() {}

CheckboxRenderer.prototype.init = function(params) {
  this.params = params;

  this.eGui = document.createElement('input');
  this.eGui.type = 'checkbox';
  this.eGui.checked = params.value;

  this.checkedHandler = this.checkedHandler.bind(this);
  this.eGui.addEventListener('click', this.checkedHandler);
}

CheckboxRenderer.prototype.checkedHandler = function(e) {
  let checked = e.target.checked;
  let colId = this.params.column.colId;
  this.params.node.setDataValue(colId, checked);
  if (checked === true){
    alert("Agregado a Favoritos");

  }
  
}

CheckboxRenderer.prototype.getGui = function(params) {
  return this.eGui;
}

CheckboxRenderer.prototype.destroy = function(params) {
  this.eGui.removeEventListener('click', this.checkedHandler);
}




    
