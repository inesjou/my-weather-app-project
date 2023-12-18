function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");

  apiSearch(searchInput.value);
}

function apiSearch(city) {
  let apiKey = "43btb7f306f4a0569633eb0o88c9fec4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let currentTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#searched-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(currentTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

apiSearch("Paris");
