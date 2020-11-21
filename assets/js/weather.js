var userFormEl = document.querySelector("#user-form");
var cityInputEl= document.querySelector('#searchCity');

var getCity= function(city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city +
    "&units=imperial&appid=184b90f195e0b6670ef9fee34b9291e1")
    .then( function (response) {
      return response.json();
    })
      .then(function(response) {
        console.log(response.data);
      });
    }
getCity("city")

var formSubmitHandler = function(event) {
  event.preventDefault();

  //get value from the input element
  var searchedCity = cityInputEl.value.trim();

  if (searchedCity) {
      getCity(searchedCity);
      cityInputEl.value = "";
  }
  else {
      alert("Please enter a city");
  }
  
  console.log(event);
};

userFormEl.addEventListener("submit", formSubmitHandler);