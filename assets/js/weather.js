var lat;
var lon;
var searches = [];

// I need to add the storage functiona dn click event
var saveSearches = function() {
  localStorage.setItem("searches", JSON.stringify(searches));
};

// Load searches from local storage
var loadSearches = function() {
  searches = JSON.parse(localStorage.getItem("searches"));

  if (!searches) {
    searches = [];
  }

  for (var i = 0; i < searches.length; i++) {
    var searchItem = $("<li>")
      .addClass("list-group-item")
      .text(searches[i]);

    $(".list-group").prepend(searchItem);
  }
};

loadSearches();
// If search button is clicked add new list item element with name of searched city
$("#searchBtn").click(function(event) {
  displayWeatherInfo($("#city").val());
  searches.push($("#city").val());
  var searchItem = $("<li>")
    .addClass("list-group-item")
    .text($("#city").val());
  
  $(".list-group").prepend(searchItem);
  saveSearches();
});

$(".list-group").on("click", "li", function () {
  displayWeatherInfo($(this).text())
});

var displayWeatherInfo = function(city) {

  var apiWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=184b90f195e0b6670ef9fee34b9291e1";
  
  // get today's weather data
  fetch(apiWeather).then(function (response) {
    // successful?
    if (response.ok) {
      response.json().then(function (weatherData) {
        console.log(weatherData);
        lat = weatherData.coord.lat;
        lon = weatherData.coord.lon;

        // Update the day
        var dateAndTime = weatherData.name + " " + moment().format("(M/D/YYYY)");
        $("#city-name").html(dateAndTime + "<img src='http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png'>");

        var temperature = "Temperature: " + weatherData.main.temp + "°F";
        $("#temperature").text(temperature);

        var humidity = "Humidity: " + weatherData.main.humidity + "%";
        $("#humidity").text(humidity);

        var windSpeed = "Wind Speed: " + weatherData.wind.speed + " mph";
        $("#wind-speed").text(windSpeed);

        var onecallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=184b90f195e0b6670ef9fee34b9291e1";

        var uvAPI = "https://api.openweathermap.org/data/2.5/uvi?lat=" + weatherData.coord.lat + "&lon=" + weatherData.coord.lon + "&appid=184b90f195e0b6670ef9fee34b9291e1";

        // 5 day forcast
        fetch(onecallURL).then(function(response) {
          // successful?
          if (response.ok) {
            response.json().then(function (forecastData) {
              for (var i = 1; i <= 5; i++) {
                dayId = "#day" + (i);
                $(dayId).find("h3").text(moment.unix(forecastData.daily[i].dt).format("M/D/YYYY"));
                $(dayId).find("img").attr("src", "http://openweathermap.org/img/wn/" + forecastData.daily[i].weather[0].icon + "@2x.png");
                $(dayId).find(".temp").text("Temp: " + forecastData.daily[i].temp.day + " F°");
                $(dayId).find(".humid").text("Humidity: " + forecastData.daily[i].humidity + "%");
              }
            });
          }
        });
        
        // uv data and display
        fetch(uvAPI).then(function(response) {
          if (response.ok) {
            response.json().then(function (uvData) {
              var uvIndex = uvData.value;
                if (uvIndex >= 8) {
                  $("#uv-index").html("UV Index: <span class='bg-danger'>" + uvIndex + "</span>");
                } else if (uvIndex >= 3) {
                  $("#uv-index").html("UV Index: <span class='bg-warning'>" + uvIndex + "</span>");
                } else {
                  $("#uv-index").html("UV Index: <span class='bg-success'>" + uvIndex + "</span>");
                }
            });
          }
        });
      });
    }
  });
};

/*var userFormEl = document.querySelector("#user-form");
var cityInputEl= document.querySelector('#search-city');
var currentCityTemp= document.getElementById("curren-city-temp");
var currentCityMain=document.getElementById("current-city-title");
var currentCityHumidity=document.getElementById("current-city-humidity");
var currentCityWindSpeed=document.getElementById("wind-speed");
var currentCityUVIndex=document.getElementById("uv-index");
var forecastCardDeck=document.getElementById("forcast-card-container")
var currentDateEl= document.getElementById("featured")
var firstDayEl=document.getElementById("first-day");

Get the current Weather
currentWeather= function(city){
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city +
  "&units=imperial&appid=184b90f195e0b6670ef9fee34b9291e1")
  .then( function (response) {
    return response.json();
  })
    .then(function(data) {
      console.log(data)
});
}

var displayCurrentWeather= function(data) {
//   currentCityMain.textContent= "City " + "(" + currentDateEl + ")";;
var temp = data.main.temp;
console.log(temp);
   var humidity = data.main.humidity;
   console.log(humidity);
   var wind = data.wind.speed;
   console.log(wind);
//currentCityTemp.textContent= "Temperature:" + temp + "F";
//currentCityHumidity.textContent= "Humidity:" + humidity + "%";
//currentCityWindSpeed.textContent= "Wind Speed:" + wind + "MPH";
var iconCurrent = data.weather[0].icon;
var icoCurrImg=document.createElement('img');
//icoCurrImg.setAttribute('src',"http://openweather.org/img/wn/" + iconCurrent + "@2x.png");
//iconCurreEl.appendChild(icoCurrImg);

}
/*
    "http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png";
    currentCityMain.innerHTML =currentWeather.name+ '<img src="' + weatherIcon + '">'
    currentCityWindSpeed.innerHTML= currentWeather.wind.speed
    currentCityHumidity.innerHTML=currentWeather.main.humidity
    currentCityTemp.innerHTML=currentWeather.main.temp

  }*/

/*
//Dcurrent UV Index
var getUVData = function(coordinates) {
  console.log(coordinates);

  var lat = coordinates.city.coord.lat
 console.log(lat);

 var lon = coordinates.city.coord.lon
 console.log(lon);

 fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=184b90f195e0b6670ef9fee34b9291e1")
 .then( function (response) {
  return response.json();
})
  .then(function(response) {
    console.log(response.data);
  });
}
getUVData("coordinates");


// Get information from API
var getForecast= function() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + data +
    "&units=imperial&appid=184b90f195e0b6670ef9fee34b9291e1")
    .then( function (response) {
      return response.json();
    })
      .then(function(data) {
        console.log(data);
      });
    }

//Complete search and push to the choice to the forecast and current weather function
//Enable the the user t to select their own city, previously had this hardcoded to prove it worked
var selectedCity = function(event) {
  event.preventDefault();
  //get value from the input element
  var searchedCity = cityInputEl.value.trim();
console.log(searchedCity);
fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity +
  "&units=imperial&appid=184b90f195e0b6670ef9fee34b9291e1")
  .then( function (response) {
    return response.json();
  })
    .then(function(data) {
      console.log(data);
      displayCurrentWeather(data);
      getForecast(data);
    })
    };
//Display the Current/ 5 day forecast
var displayForecast= function(data) {
  var firstDay = moment().add(1, 'days').format('M/D/YYYY');
  //firstDayEl.textContent=firstDay;
  var temp1 =data.list[3].main.temp;
  console.log(temp1);
  var humidity1= data.list[3].main.humidity;
  console.log(humidity1);
  //var icon1= data.list[3].weather[0].icon;
  //var icon1Img=document.createElement('img');
 // icon1Img.setAttribute('src', "http://openweathermap.org/img/wn/" + icon1 + "@2x.png");
 // icon1El.appendChild(icon1Img);
  //temp1El.textContent= "Temp " + temp1 +  "F";
 // humidity1El.text.textContent="Humidity" + humidity1 + "%";

}
/// event handler to start the action
userFormEl.addEventListener("submit", selectedCity);
*/