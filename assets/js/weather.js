var userFormEl = document.querySelector("#user-form");
var cityInputEl= document.querySelector('#searchCity');

// Get information from API
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

//Enable the the user t to select their own city, previously had this hardcoded to prove it worked
var formSubmitHandler = function(event) {
  event.preventDefault();

  //get value from the input element
  var searchedCity = cityInputEl.value.trim();

  if (searchedCity) {
      getCity(searchedCity);
      cityInputEl.value = "";
  }
  else {
    //if they failed to put in a city, gave them user feedback
      alert("Please enter a city");
  }
  
  console.log(event);
};

//Display the Current/ 5 day forecast


/// event handler to start the action
userFormEl.addEventListener("submit", formSubmitHandler);