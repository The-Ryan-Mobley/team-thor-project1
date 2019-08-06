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
$.ajax({
    url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID="+ weatherKey,
    method: "GET",

}).then((response)=>{
    console.log(response);

});
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

var popup = L.popup();
var latitude;
var longitude;
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
        console.log(e.latlng);
        latitude=e.latlng.lat;
        longitude=e.latlng.lng;
}

map.on('click', onMapClick);