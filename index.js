const API_URL = "https://api.open-meteo.com/v1/forecast";
const LATITUDE = "latitude=53.9000000";
const LONGITUDE = "longitude=27.5666700";
const INFO_KEYS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "is_day",
  "surface_pressure",
  "wind_speed_10m",
];
const CURRENT_INFO = `current=${INFO_KEYS.join(",")}`;
const PAST_DAY = "past_days=1";

const urlCurrentTemperature = `${API_URL}?${LATITUDE}&${LONGITUDE}&${PAST_DAY}&${CURRENT_INFO}`;

const mainTemperature = document.getElementById("main_weather_data_temperature");
const windSpeed = document.getElementById("wind_speed");
const relativeHumidity = document.getElementById("relative_humidity");
const surfacePressure = document.getElementById("surface_pressure");
const apparentTemperature = document.getElementById("apparent_temperature");
const currentTime = document.getElementById("current_time");

fetch(urlCurrentTemperature)
  .then((data) => {
    return data.json();
  })
  .then((info) => {
    console.log(info);
    renderCurrentTemperature(info.current.temperature_2m);
    renderCurrentWindSpeed(info.current.wind_speed_10m);
    renderCurrentRelativeHumidity(info.current.relative_humidity_2m);
    renderCurrentSurfacePressure(info.current.surface_pressure);
    renderCurrentApparentTemperature(info.current.apparent_temperature);
    renderCurrentTime(info.current.time);
  });

function renderCurrentTemperature(data) {
  mainTemperature.prepend(`+${Math.round(data)}°`);
}
function renderCurrentWindSpeed(data) {
  windSpeed.append(`${(data * 0.277778).toFixed(1)}м/с`);
}
function renderCurrentRelativeHumidity(data) {
  relativeHumidity.append(`${data}%`);
}
function renderCurrentSurfacePressure(data) {
  surfacePressure.append(`${Math.round(data)} мм рт.ст.`);
}
function renderCurrentApparentTemperature(data) {
  apparentTemperature.append(`+${Math.round(data)}°`);
}
function renderCurrentTime(data) {
  currentTime.append(currentDate);
}

const date = new Date();
const hour = date.getHours().toString().length < 2 ? "0" + date.getHours() : date.getHours();
const min = date.getMinutes().toString().length < 2 ? "0" + date.getMinutes() : date.getMinutes();
const currentDate = `${hour}:${min}`;
console.log("curData:", currentDate);
