//https://api.nasa.gov/planetary/apod?api_key=nUEptcB91ocekFHCzpFrc6dnWCcnRhIVaNgEVOTd
//https://ssd-api.jpl.nasa.gov/nhats.api
//https://www.sky-map.org/?ra=18.5&de=40&zoom=3
//http://server1.sky-map.org/skywindow.jsp?object=M100&zoom=8&img_source=SDSS
// $.ajax({
//     url: "https://ssd-api.jpl.nasa.gov/nhats.api",
//     method: "GET",

// }).then((response)=>{
//     console.log(response);

// });
//http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
var weatherKey="40d4a57683aeb7e88b7acf955c82d2a6";

var map = L.map('map', {
    center: [29.7602, -95.3694],
    zoom: 13
});
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWVhdHNoaWVsZG1hbiIsImEiOiJjanl2cnRvanAwZXVkM2NvYm16MzRzdXB4In0.c0UspdiYTGPjlbOdWti3ww'
}).addTo(map);

L.Control.geocoder().addTo(map);

var popup = L.popup();
var latitude;
var longitude;

function getForecast(lat, lon){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&APPID="+ weatherKey,
        method: "GET",
    
    }).then((response)=>{
        console.log(response);
        //response.list[0] for todays weather

    
    });
}
function displayForecast(clouds, wind, temp,rain){
    tempInF = 9/5(temp-237)+32;
    temoInC = temp - 237;
    let weatherContainer = $('<div class="weather-div">');
    let cloudDOM = $('<div class="weather-cell">');
    let windDOM = $('<div class="weather-cell"');
    let tempDOM = $('<div class="weather-cell">');
    let rainDOM = $('<div class="weather-cell">');

}
function findWindDirection(windDeg){
    let directions=['N','S','E','W','NE','NW','SE','SW'];
    let windDirection = "";
    if((windDeg >= 340) || (windDeg <= 30)){
        windDirection = directions[0];
    }
    else if((windDeg > 30)&&(windDeg <= 60)){
        windDirection = directions[4];
    }
    else if((windDeg > 60)&&(windDeg <= 60))
    return windDirection;
    
}


function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
        console.log(e.latlng);
        latitude=e.latlng.lat;
        longitude=e.latlng.lng;
        getForecast(latitude.toString(),longitude.toString());
}

map.on('click', onMapClick);


