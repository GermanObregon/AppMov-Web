export const GetDataCoingecko = async () => {
    try{
        let API_ADDRESS = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        const respuesta = await fetch(API_ADDRESS);
        const datos = await respuesta.json();
        return datos;
    }catch(error){

    }
    
}

export const GetDataCoinCoingecko = async (coin) => {
    try{
        let API_ADDRESS = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}&order=market_cap_desc&per_page=100&page=1&sparkline=true`
        const respuesta = await fetch(API_ADDRESS);
        const datos = await respuesta.json();
        return datos;
    }catch(error){

    }
    
}