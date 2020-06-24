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
// console.log("hello");

//primary api key: 096ef74ec84603cb5d797eef6a3f0327
//backup api key: 51eff38dc476b28387cdbdbd9705ea5b

var currentDate = moment().format("dddd, MMMM Do YYYY");

//grabbing value from search field
var citySearch = $("#searchField").val();
//when user clicks on the search button
$(".searchBtn").on("click", function (event) {
    //prevent page from reloading
    event.preventDefault();
    //empties the cardCol field to prevent stacking              
    $(".cardCol").empty();
    //empties the weatherIcon field to prevent stacking
    $(".weatherIcon").empty()

    var citySearch = $("#searchField").val();


    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=51eff38dc476b28387cdbdbd9705ea5b&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        $(".mainCityName").text(`${response.name}, ${response.sys.country}`);
        $(".currentDate").text(currentDate);
        $(".temp").text(`Temperature: ${response.main.temp}° F`);
        $(".humidity").text(`Humidity: ${response.main.humidity}%`);
        $(".windSpeed").text(`Wind Speed: ${response.wind.speed} mph ${response.wind.deg} degrees`);
        $(".weatherIcon").append(`<img src = "http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"></img>`);

        queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${response.coord.lat}` + "&lon=" + `${response.coord.lon}` + "&exclude=minutely,hourly&appid=51eff38dc476b28387cdbdbd9705ea5b&units=imperial";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var uvIndex = response.current.uvi;
            // console.log(uvIndex);
            var uvPrint = $(".uvIndex").text(`UV Index: ${uvIndex}`);
            if (uvIndex < 3) {
                uvPrint.css("background-color", "green");
            } else if (uvIndex < 6) {
                uvPrint.css("background-color", "yellow");
            } else {
                uvPrint.css("background-color", "red");
            };

            for (i = 1; i < 6; i++) {
                var unixTimestamp = response.daily[i].dt
                var unixDate = new Date(unixTimestamp * 1000);
                var convertedDate = moment(unixDate).format("MM/DD/YYYY");
                var forecast = {
                    date: convertedDate,
                    temp: response.daily[i].temp.day,
                    humidity: response.daily[i].humidity,
                    icon: response.daily[i].weather[0].icon,
                    card: $(".cardCol")
                }

                // console.log(forecast);

                var details = `<div class="card cardBox" style="width: 18rem;">
                    <div class="card-body cardBody">
                        <h5 class="card-title cardDate">${forecast.date}</h5>
                        <img src = "http://openweathermap.org/img/wn/${forecast.icon}@2x.png"></img>
                        <p class="card-text cardTemp">Temp: ${forecast.temp}° F</p>
                        <p class="card-text cardHumidity">Humidity: ${forecast.humidity}%</p>

                    </div>
                </div>`;

                //function makeCard() {
                //forecast.card.empty();
                forecast.card.append(details);
                // console.log(details);
            };
        });
        CityList = [];
        var cityToStore = $("#searchField").val();

        var storedCity = localStorage.setItem("data", JSON.stringify(cityToStore));

        var returnedCity = JSON.parse(localStorage.getItem("data"));
        console.log(returnedCity);

        if (localStorage.getItem("data")) {
            var index = -1;
            var searchList = $(".searchHistory");
            var listInput = `<li class="list-group-item searchHistCities">${returnedCity}</li>`;



            for (i = 0; i < CityList.length; i++) {
                // console.log(CityList);
                if (returnedCity[i] === returnedCity) {
                    index = i;
                }
            }
            if (index === -1) {
                CityList.push(storedCity);
                searchList.append(listInput);
            }
            console.log(listInput);
        } else {
            CityList.push(storedCity);
        }
        console.log(CityList);
    });
});
function onLoad() {
    if (localStorage.getItem("data")) {
        for (i = 0; i < CityList.length; i++) {}
    }
}