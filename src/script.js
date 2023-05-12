let now = new Date();

let currentDay = now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thusday",
  "Friday",
  "Saturday",
]; // from 0 to 6

let day = days[now.getDay()];

let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDayTime = document.querySelector("#current-day-time");

currentDayTime.innerHTML = `${day}  ${hours}:${minutes}`;

function search(city) {
  let apiKey = "9bt7o733de4f51be10f6e5b3c6aa4fc2";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  https: axios.get(apiUrl).then(showTemperature);
}

function showCityTemperature(event) {
  event.preventDefault();

  let h1 = document.querySelector("h1");

  let cityName = document.querySelector("#city-name-input").value;

  h1.innerHTML = cityName;

  let apiKey = "9bt7o733de4f51be10f6e5b3c6aa4fc2";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);

  document.querySelector("h1").innerHTML = response.data.city;

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#description").innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity - ${response.data.temperature.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind - ${Math.round(
    response.data.wind.speed
  )} m/s`;

  document.querySelector("#icon").setAttribute(
    "src",

    `${response.data.condition.icon_url.replace("http:", "https:")}`
  );

  getForecast(response.data.coordinates);
}

function showPosition(position) {
  console.log(position);

  let lat = position.coords.latitude;

  let lon = position.coords.longitude;

  let apiKey = "9bt7o733de4f51be10f6e5b3c6aa4fc2";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", showCityTemperature);

let currentButton = document.querySelector("#current-button");

currentButton.addEventListener("click", getCurrentLocation);

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "9bt7o733de4f51be10f6e5b3c6aa4fc2";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    // from 0 to 6
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                        <div class="weather-forecast-date">
                             ${formatDay(forecastDay.time)}
                        </div>
                        <img src=${forecastDay.condition.icon_url.replace(
                          "http:",
                          "https:"
                        )} alt="" width="80" />
                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperature-min">${Math.round(
                              forecastDay.temperature.minimum
                            )}° </span>
                            <span class="weather-forecast-temperature-max">${Math.round(
                              forecastDay.temperature.maximum
                            )}° </span>
                        </div>
                    </div>
       `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  console.log(forecastHTML);
}

search("Kyiv");
