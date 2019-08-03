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
// $.ajax({
//     url: "https://api.ipgeolocation.io/astronomy?apiKey=b9f0ccb9168647e7a0ffc452ac116e43",
//     method: "GET",

// }).then((response)=>{
//     console.log(response);

// });
var map = L.map('mapid', {
    center: [51.505, -0.09],
    zoom: 13
});
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWVhdHNoaWVsZG1hbiIsImEiOiJjanl2cnRvanAwZXVkM2NvYm16MzRzdXB4In0.c0UspdiYTGPjlbOdWti3ww'
}).addTo(map);