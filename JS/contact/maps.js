let map;
let marker;

let watchID;
let geoLoc;

const initMap = () => {
    const myLatLng = { lat: -34.636872, lng: -58.406260 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: myLatLng
    });
    marker = new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hola Mundo"
    });
    //   getPosition();
}

const getPosition = () => {
    if (navigator.geolocation) {
        var options = { timeout: 60000 };
        geoLoc = navigator.geolocation;
        watchID = geoLoc.watchPosition(showLocationOnMap, errorHandler, options);
    } else {
        alert("No funciona explorador");
    }
}

const showLocationOnMap = (position) => {
    var latitud = position.coords.latitude;
    var longitud = position.coords.longitude;

    const myLatLng = { lat: latitud, lng: longitud };
    marker.setPosition(myLatLng);
    map.setCenter(myLatLng)
}

const errorHandler = (err) => {
    if (err.code == 1) {
        alert("Error: Acceso Denegado")
    }
    else {
        alert("Error: Posicion no existe!");
    }
}

initMap();