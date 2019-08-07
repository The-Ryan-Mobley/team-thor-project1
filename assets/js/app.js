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
        let reArray = response.list[0];
        //every 12 hours for 3 days
        displayForecast(reArray.weather[0].description,reArray.wind,reArray.main.temp);

    
    });
}
function displayForecast(clouds, wind, temp){
    
    let tempInF = Math.round((temp-273.15)*9/5+32);
    let tempInC = temp - 237;
    let windDirection = findWindDirection(wind.deg);
    
    let weatherContainer = $('<div class="weather-div">');
    let cloudDOM = $('<div class="weather-cell">');
    let windDOM = $('<div class="weather-cell">');
    let tempDOM = $('<div class="weather-cell">');
   
    weatherContainer.prependTo($('#weather-feed'));
    
    cloudDOM.appendTo(weatherContainer);
    windDOM.appendTo(weatherContainer);
    tempDOM.appendTo(weatherContainer);
    cloudDOM.html(clouds.toString());
    windDOM.html('wind direction: '+windDirection);
    tempDOM.html(tempInF.toString()+'F');
    

}
function findWindDirection(windDeg){
    let directions=['N','S','E','W','NE','NW','SE','SW'];
    let windDirection = "";
    if((windDeg >= 335.5) || (windDeg <= 22.5)){
        windDirection = directions[0];
    }
    else if((windDeg > 22.5)&&(windDeg <= 67.5)){
        windDirection = directions[4];
    }
    else if((windDeg > 67.5)&&(windDeg <= 112.5)){
        windDirection = directions[2];
    }
    else if((windDeg > 112.5)&&(windDeg <= 157.5)){
        windDirection = directions[6];
    }
    else if((windDeg > 157.5)&&(windDeg <= 202.5)){
        windDirection = directions[1];
    }
    else if((windDeg > 202.5)&&(windDeg <= 247.5)){
        windDirection = directions[7];
    }
    else if((windDeg > 247.5)&&(windDeg <= 295.5)){
        windDirection = directions[3];
    }
    else if((windDeg > 295.5)&&(windDeg <= 335.5)){
        windDirection = directions[5];
    }
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


