
'use strict';
import { GetDataCoingecko } from "./service.js"

const items = document.getElementById('items');
const templateCard = document.getElementById('cards').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await GetDataCoingecko();
    crearCards(res);
  } catch (error) {
    console.log(error);
  }
}

const crearCards = data => {
  data.forEach(cripto => {
    templateCard.querySelector('button').setAttribute('data-id', cripto.id);
    templateCard.querySelector('h4').textContent = cripto.name;
    templateCard.querySelector('p.text--medium').textContent = formatter.format(cripto.current_price);
    templateCard.querySelector('img').setAttribute("src", cripto.image);

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment)
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
