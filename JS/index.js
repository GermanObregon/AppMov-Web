'use strict';
import {GetData} from "./Service.js"

let boton = document.getElementById("datos");
boton.addEventListener('click' , async () => {
    let Filter = "BTC,ETH,XRP";
    let Currency="USD";
    let Response = await GetData(Currency , Filter);
    
    console.log(Response);
})


    