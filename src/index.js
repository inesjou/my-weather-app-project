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
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(currentTemperature);
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" width=60px/>`;

  apiForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function apiForecast(city) {
  let apiKey = "43btb7f306f4a0569633eb0o88c9fec4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
              <span class="weather-forecast-date">${day}</span>
              <span class="weather-forecast-icon">🌤️</span>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">
                  <strong>15º</strong>
                </span>
                <span class="weather-forecast-temperature-min">9º</span>
              </div>
      </div>
    `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

apiSearch("Paris");
