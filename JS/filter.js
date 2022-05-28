import { GetDataCoingecko } from "./Service.js"
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
let suggestions;

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

const fetchData = async () => {
    try {
        const res = await GetDataCoingecko();
        suggestions = res;
    } catch (error) {
        console.log(error);
    }
}


inputBox.onkeyup = (e) =>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        icon.onclick = () => {
            webLink = "https://www.google.es/search?q=${userData}";
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }

        emptyArray = suggestions.filter((data) => {
            return data.name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map((data) => {
            return data = `<li>${data.id}</li>`;
        })

        searchWrapper.classList.add("active");
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this)");
        }
        }else{
            searchWrapper.classList.remove("active");
        }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = () => {
        webLink = "https://www.google.es/search?q=${userData}";
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
         listData = `<li>${userValue}</li>`;
        
    }else{
        listData = list.join("");
    }
    console.log(listData);
    suggBox.innerHTML = listData;
}