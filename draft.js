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

// html
// <!-- <div class="top_block">
// <div class="top_block_left_side">
//   <h2>Квартал Верхний город, Минск</h2>
//   <h4 class="location_temperature_yesterday">
//     Сейчас <span id="current_time"></span>. Вчера в это время
//     <span class="location_temperature_yesterday_bold">+24°</span>
//   </h4>
// </div>
// <a href="/" class="link_telegram">
//   <div class="circle_logo">
//     <svg class="telegram_logo_pic" viewBox="0 0 32 32">
//       <path
//         d="M17 32c-0.072 0-0.144-0.008-0.217-0.024-0.458-0.102-0.783-0.507-0.783-0.976v-15h-15c-0.469 0-0.875-0.326-0.976-0.783s0.129-0.925 0.553-1.123l30-14c0.381-0.178 0.833-0.098 1.13 0.199s0.377 0.749 0.199 1.13l-14 30c-0.167 0.358-0.524 0.577-0.906 0.577zM5.508 14h11.492c0.552 0 1 0.448 1 1v11.492l10.931-23.423-23.423 10.931z"
//       ></path>
//     </svg>
//   </div>
// </a>
// </div>
// <div class="main_block">
// <ul class="main_weather_data">
//   <li class="a main_weather_data_temperature" id="main_weather_data_temperature">
//     <img
//       src="./img/meteocons-icons/SVG/30.svg"
//       alt="main_weather_pic"
//       class="main_weather_data_temperature_pic"
//     />
//   </li>
//   <li class="b weather_description">
//     <h3>Облачно с прояснениями</h3>
//     <h4 class="weather_description_feel">
//       Ощущается как
//       <span class="weather_description_feel_ass" id="apparent_temperature"></span>
//     </h4>
//   </li>
//   <li class="c" id="wind_speed">
//     <img
//       src="./img/meteocons-icons/SVG/6.svg"
//       alt="wind_speed_icon"
//       class="weather_description_wind_speed_icon"
//     />
//   </li>
//   <li class="d" id="relative_humidity">
//     <img
//       src="./img/meteocons-icons/SVG/droplet.svg"
//       alt="wet_icon"
//       class="weather_description_wet_icon"
//     />
//   </li>
//   <li class="e" id="surface_pressure">
//     <img
//       src="./img/meteocons-icons/SVG/43.svg"
//       alt="pressure_icon"
//       class="weather_description_pressure_icon"
//     />
//   </li>
// </ul>
// </div>
// <div class="slider">
// <div class="line"></div>
// <div class="circle_arrow_left"></div>
// <div class="slider_content_wrapper">
//   <div class="slider_time">18:00</div>
//   <div class="slider_weather_picture">
//     <img src="" alt="" />
//   </div>
//   <div class="slider_temperature">+24</div>
// </div>
// <div class="circle_arrow_right"></div>
// </div> -->

// const genWeather = (dataWeather) =>
//   dataWeather?.map((data) =>
//     genElement("div", { class: "top_block" }, [
//       genElement("div", { class: "top_block_left_side" }, [
//         genElement("h2", {}, ["Квартал Верхний город, Минск"]),
//         genElement("h4", { class: "location_temperature_yesterday" }, [
//           "Сейчас ",
//           genElement("span", { id: "current_time" }),
//           ". Вчера в это время",
//           genElement("span", { class: "location_temperature_yesterday_bold" }, [

//           ]),
//         ]),
//       ]),
//     ])
//   );
