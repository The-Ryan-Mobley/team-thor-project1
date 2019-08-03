//https://api.nasa.gov/planetary/apod?api_key=nUEptcB91ocekFHCzpFrc6dnWCcnRhIVaNgEVOTd
//https://ssd-api.jpl.nasa.gov/nhats.api
//https://www.sky-map.org/?ra=18.5&de=40&zoom=3
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
$.ajax({
    url: "https://www.sky-map.org/?ra=18.5&de=40&zoom=3",
    method: "GET",

}).then((response)=>{
    console.log(response);

});