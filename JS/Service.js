import { GetKey } from "./const.js";

export const GetData = async (currency, filter) => {
    const API_KEY = GetKey();
    let API_ADDRESS = `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&interval=1d,30d&convert=${currency}&per-page=100&page=1`
    let response = await fetch(API_ADDRESS);
    let data = response.json();

    return data;
}

export const GetDataCoingecko = async () => {
    try{
        let API_ADDRESS = `https://api.coingecko.com/api/v3/coins/list`
        const respuesta = await fetch(API_ADDRESS);
        const datos = await respuesta.json();
        console.log(datos);
        return datos;
    }catch(error){

    }
    
}

export const GetDataCoinCoingecko = async (coin) => {
    try{
        let API_ADDRESS = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=ars&days=1&interval=diario`
        const respuesta = await fetch(API_ADDRESS);
        const datos = await respuesta.json();
        return datos;
    }catch(error){

    }
    
}