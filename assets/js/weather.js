var selectedCity= document.querySelector('#searchCity').value;

var searchCity= function(city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city +
    "&units=imperial&appid=184b90f195e0b6670ef9fee34b9291e1")
    .then( function (response) {
      return response.json();
    })
      .then(function(response) {
        console.log(response.data);
      });
    }
searchCity("Philadelphia")

