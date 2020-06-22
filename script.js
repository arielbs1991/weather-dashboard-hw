// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
console.log("hello");
var citySearch = JSON.stringify($(".searchBtn").innerHTML);

//primary api key: 096ef74ec84603cb5d797eef6a3f0327
//backup api key: 51eff38dc476b28387cdbdbd9705ea5b

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=51eff38dc476b28387cdbdbd9705ea5b&units=imperial";


var currentDate = moment().format("dddd, MMMM Do YYYY");
console.log(currentDate);

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=51eff38dc476b28387cdbdbd9705ea5b&units=imperial";
    console.log(queryURL);
    console.log(response);
    $(".searchBtn").on("click", function () {
$("div.mainCityName").html("<h3>" + response.name + "</h3>");
$("div.currentDate").append(currentDate);
$("div.temp").text(`temperature: ${response.main.temp} degrees F`);
$("div.humidity").text(`Humidity: ${response.main.humidity}%`);
$("div.windSpeed").text(`Wind Speed: ${response.wind.speed} mph ${response.wind.deg} degrees`);

    });
});
