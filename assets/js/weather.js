// Initialize Firebase
var config = {
    apiKey: "AIzaSyAalnlowfk7atMaLgN3LGKDG9N-N6i9fxw",
    authDomain: "shoot-the-curl.firebaseapp.com",
    databaseURL: "https://shoot-the-curl.firebaseio.com",
    projectId: "shoot-the-curl",
    storageBucket: "shoot-the-curl.appspot.com",
    messagingSenderId: "291488823524"
};
firebase.initializeApp(config);

// AJAX
function getLoc() {
    var locationName = $(".location").val();     // ****CHANGE THIS TO INPUT VALUE*****
    var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + locationName + "&maxprice=2&rankby=prominence&type=bar&key=AIzaSyAHyYRJfWWzGaz8Ifc7v3_9dqUUrKR2Xz0";
    // GOOGLE AJAX
    $.ajax({
        url: queryURL,
        method: "GET",
        // GOOGLE PROMISE
    }).done(function (gResponse) {
        console.log(queryURL);
        console.log(gResponse);

        // COORDINATES
        // LATITUDE
        console.log("Lat:" + gResponse.results["0"].geometry.location.lat);
        var lat = gResponse.results["0"].geometry.location.lat;
        //LONGITUDE
        console.log("Long:" + gResponse.results["0"].geometry.location.lng);
        var long = gResponse.results["0"].geometry.location.lng;
        weather(lat,long);
    })
}
// FUNCTION TO CALL WEATHER AJAX
function weather(lat, long) {
    // search + API Key
    var location = lat + "," + long;
    var queryURL = "http://api.worldweatheronline.com/premium/v1/marine.ashx?key=913a2d1646d941cea87153512172112&q=" + location + "&tp=24&tide=yes&format=json";

    // WEATHER AJAX
    $.ajax({
        url: queryURL,
        method: "GET",
        //WEATHER PROMISE
    }).done(function (response) {
        console.log(queryURL);
        console.log(response);

        // Today Var's
        var todayTemp = response.data.weather["0"].hourly["0"].tempF;
        var todayRise = response.data.weather["0"].astronomy["0"].sunrise;
        var todaySet = response.data.weather["0"].astronomy["0"].sunset;
        var todayWave = response.data.weather["0"].hourly["0"].swellHeight_ft;
        var todayLowTide = response.data.weather["0"].tides["0"].tide_data[1].tideTime;
        var todayHighTide = response.data.weather["0"].tides["0"].tide_data[2].tideTime;

        // Tomorrow var's
        var tomTemp = response.data.weather["1"].hourly["0"].tempF;
        var tomRise = response.data.weather["1"].astronomy["0"].sunrise;
        var tomSet = response.data.weather["1"].astronomy["0"].sunset;
        var tomWave = response.data.weather["1"].hourly["0"].swellHeight_ft;
        var tomLowTide = response.data.weather["1"].tides["0"].tide_data[1].tideTime;
        var tomHighTide = response.data.weather["1"].tides["0"].tide_data[2].tideTime;

        // 3rd Day Var
        var nextTemp = response.data.weather["2"].hourly["0"].tempF;
        var nextRise = response.data.weather["2"].astronomy["0"].sunrise;
        var nextSet = response.data.weather["2"].astronomy["0"].sunset;
        var nextWave = response.data.weather["2"].hourly["0"].swellHeight_ft;
        var nextLowTide = response.data.weather["2"].tides["0"].tide_data[1].tideTime;
        var nextHighTide = response.data.weather["2"].tides["0"].tide_data[2].tideTime;
        // DOM Manipulation
        $("#todTemp").text(todayTemp);

    })
}
$(".search").on("click", function (event) {
    getLoc();
})