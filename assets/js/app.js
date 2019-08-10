//https://api.nasa.gov/planetary/apod?api_key=nUEptcB91ocekFHCzpFrc6dnWCcnRhIVaNgEVOTd
//https://ssd-api.jpl.nasa.gov/nhats.api
//https://www.sky-map.org/?ra=18.5&de=40&zoom=3
//http://server1.sky-map.org/skywindow.jsp?object=M100&zoom=8&img_source=SDSS

var weatherKey="40d4a57683aeb7e88b7acf955c82d2a6";
var popup = L.popup();
var latitude=29.7602;
var longitude=-95.3694;
var siderealTime;
var InputDate = new Date();
var userDate = getTime(InputDate, 0);
var dateindex = 1;

var map = L.map('map', {
    center: [latitude, longitude],
    zoom: 10
});
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWVhdHNoaWVsZG1hbiIsImEiOiJjanl2cnRvanAwZXVkM2NvYm16MzRzdXB4In0.c0UspdiYTGPjlbOdWti3ww'
}).addTo(map);

popup
.setLatLng([latitude,longitude])
.setContent("Houston is at " + map.getCenter().toString())
.openOn(map);

function populatePage(){
    getForecast(latitude.toString(),longitude.toString());
    queryIPGeo();
    queryUSNO(latitude, longitude);
};


populatePage();



var searchControl=L.Control.geocoder({
    defaultMarkGeocode: false
  }).on('markgeocode', function(e) {
      console.log(e)
        popup
        .setLatLng(e.geocode.center)
        .setContent("You searched for " + e.geocode.name + " at coordinates " + e.geocode.center.toString())
        .openOn(map);
        console.log(e.geocode.center);
        latitude=e.geocode.center.lat;
        longitude=e.geocode.center.lng;
        map.setView([latitude,longitude],10);
        populatePage();

  }).addTo(map);


function queryUSNO(lat,lng){
    $.ajax({
        url: "https://api.usno.navy.mil/sidtime?date="+userDate.toString()+"&coords="+ lat + ","+ lng + "&time=now",
        method:"GET"
    }).then(function(response){
        siderealTime=response.properties.data[0].last.split(":");
        siderealTime[siderealTime.length-1]=Math.floor(Number(siderealTime[siderealTime.length-1])).toString();
        getskyImage(siderealTime, latitude);
    });
};
function queryIPGeo(){
    var geoDate = IpGeoDate(userDate);
    var geoKey= "b729dded76f84824b0ea13263979cd99";
$.ajax({
    url:"https://api.ipgeolocation.io/astronomy?apiKey="+geoKey+"&lat="+latitude.toString()+"&long="+longitude.toString()+"&date="+geoDate,
    method:"GET",
}).then((response)=>{
    console.log(response);
    GetSunMoon(response.sunrise,response.sunset,response.moonrise,response.moonset);
    //get sunrise/sunset

});
}
function IpGeoDate(d){
    let yyyy = d.substr(6,4);
    let dd = d.substr(3,2);
    let mm = d.substr(0,2);
    let convertedDate = yyyy + '-' + mm + '-' + dd;
    return convertedDate;
}
function ConvertGeoTime(timestring){
    let standardHour = 0;
    let standardTime = "";
    let meridian = "";
    let numone = timestring.substr(0,2);
    let extra = timestring.substr(2,3);
    console.log(timestring,numone,extra);
    let uno = parseInt(numone, 10);
    if(uno === 12){
        standardHour = uno;
        meridian = "PM";
    }
    else if(uno === 0){
        standardHour = 12;
        meridian = "AM";

    }
    else if( uno > 12){
        standardHour = uno-12;
        meridian = "PM";
    }
    else{
        standardHour = uno;
        meridian = "AM";
    }
    standardTime = [standardHour.toString() + extra + " " + meridian];
    return standardTime;
}
function getTime(d, i){
    let dd = String(d.getDate() + i).padStart(2, '0');
    let mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = d.getFullYear();
    userDate = mm + '/' + dd + '/' + yyyy;
    return userDate;

}
function GetSunMoon(SunRise,SunSet,MoonRise,MoonSet){
    let sunUpStandard = ConvertGeoTime(SunRise);
    let sunDownStandard = ConvertGeoTime(SunSet);
    let moonUp = ConvertGeoTime(MoonRise);
    let moonDown = ConvertGeoTime(MoonSet);

    $('#lunar-feed').empty();
    let moonPic=$("<img src='https://api.usno.navy.mil/imagery/moon.png?date=today' class='responsive-img'>");
    let riseHolder = $('<div class = "weather-div">');
    let sunRiseDOM = $('<div>');
    let sunSetDOM = $('<div>');
    let moonRiseDOM = $('<div>');
    let moonSetDOM = $('<div>');


    riseHolder.appendTo($('#lunar-feed'));
    moonPic.appendTo(riseHolder);
    sunRiseDOM.appendTo(riseHolder);
    sunSetDOM.appendTo(riseHolder);
    moonRiseDOM.appendTo(riseHolder);
    moonSetDOM.appendTo(riseHolder);

    sunRiseDOM.html("Sun rose at: "+ sunUpStandard);
    sunSetDOM.html("Sun sets at: "+sunDownStandard);
    moonRiseDOM.html("Moon rises at: "+moonUp);
    moonSetDOM.html("Moon sets at: "+moonDown);
  
}

    
function getForecast(lat, lon){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&APPID="+ weatherKey,
        method: "GET",
    
    }).then((response)=>{
        console.log(response);
        $('#weather-feed').empty();
        let counter = 0;
        for(let i=1; i < 6; i++){
            let day = response.list[counter];
            
            displayForecast(day.weather[0].description,day.wind,day.main.temp,day.dt_txt,i);
            counter+=8;
        }
    });
}
function displayForecast(clouds, wind, temp, day, counter){
    
    let tempInF = Math.round((temp-273.15)*9/5+32);
    let tempInC = Math.round(temp - 273);
    let windDirection = findWindDirection(wind.deg);
    let date = day.substr(0,10);

    const weatherContainer = $('<div class="weather-div">');
    if(counter === dateindex){
      weatherContainer.addClass('main-date');  
    }
    const cloudDOM = $('<div class="weather-cell">');
    const windDOM = $('<div class="weather-cell">');
    const tempDOM = $('<div class="weather-cell">');
   
    weatherContainer.appendTo($('#weather-feed'));
    
    cloudDOM.appendTo(weatherContainer);
    windDOM.appendTo(weatherContainer);
    tempDOM.appendTo(weatherContainer);
    if(counter === 1){
        cloudDOM.html("Tonights Weather: "+ clouds.toString());
    }
    else{
        cloudDOM.html("Weather for "+ date+": "+ clouds.toString());
    }
    
    windDOM.html('Wind Direction: '+windDirection+"<br>Wind Speed: "+ wind.speed+" MPH");
    tempDOM.html(tempInF.toString()+' \u00B0 F <br>'+tempInC.toString()+'\u00B0 C');
    

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

function getskyImage(srt, lat){
    console.log(JSON.stringify(srt));
    let skyhours = srt[0];
    let skymins = srt[1];
    let skysecs = srt[2];
    let skyqueryurl = "https://server1.sky-map.org/skywindow?ra="+skyhours+" "+skymins+" "+skysecs+"&de="+lat+" 00 00&zoom=8";
    let imgwidth = $("#sky-images").width();
    console.log(imgwidth);
    let skyimg = $("<IFRAME SRC='"+skyqueryurl+" WIDTH="+imgwidth+" HEIGHT="+(imgwidth*4)/5+"' WIDTH="+imgwidth+" HEIGHT="+(imgwidth*4)/5+">    </IFRAME>");
    $("#sky-images").empty();
    $("#sky-images").append(skyimg);
}


function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
        console.log(e.latlng);
        latitude=e.latlng.lat;
        longitude=e.latlng.lng;
        map.setView([latitude,longitude],10);
        populatePage();    

}

map.on('click', onMapClick);

$("#user-btn").click(function(event){
    event.preventDefault();
    let tempDate = $("#user-date").val().trim();
    tempDate = parseInt(tempDate);
    if(tempDate > 5){
        console.log("MODAL TIME");
        $('.modal').modal();
        $('.modal').modal('open');
    }
    else if(tempDate <= 5){
        dateindex = tempDate;
        userDate = getTime(InputDate, tempDate);
        console.log("user date: " + userDate);
        $("#user-date").val('');
        populatePage();
        
    }
    
});

