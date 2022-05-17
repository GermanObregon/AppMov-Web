import { GetKey } from "./Const.js";

export const GetData = async(currency , filter) => {
    const API_KEY = GetKey();
    let API_ADDRESS = `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&ids=${filter}&interval=1d,30d&convert=${currency}&per-page=100&page=1`
    let response = await fetch(API_ADDRESS);
    let criptos = response.json();

    return criptos;
}
