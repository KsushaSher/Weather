(async function () {
  const genCurrentDate = () => {
    const date = new Date();
    const hour = date.getHours().toString().length < 2 ? "0" + date.getHours() : date.getHours();
    const min =
      date.getMinutes().toString().length < 2 ? "0" + date.getMinutes() : date.getMinutes();
    const currentDate = `${hour}:${min}`;
    return currentDate;
    // console.log("curData:", currentDate);
  };

  const genElement = (tag, attrs = {}, children) => {
    const element = document.createElement(tag);
    for (const key in attrs) element.setAttribute(key, attrs[key]);
    if (children && Array.isArray(children)) element.append(...children);
    return element;
  };

  const generateContent = (data) => {
    let template = "";
    let div = genElement("div");

    template += `<div class="top_block">
  <div class="top_block_left_side">
    <h2>Квартал Верхний город, Минск</h2>
    <h4 class="location_temperature_yesterday">
      Сейчас <span id="current_time">${genCurrentDate()}</span>. Вчера в это время
      <span class="location_temperature_yesterday_bold">+24°</span>
    </h4>
  </div>
  <a href="/" class="link_telegram">
    <div class="circle_logo">
      <svg class="telegram_logo_pic" viewBox="0 0 32 32">
        <path
          d="M17 32c-0.072 0-0.144-0.008-0.217-0.024-0.458-0.102-0.783-0.507-0.783-0.976v-15h-15c-0.469 0-0.875-0.326-0.976-0.783s0.129-0.925 0.553-1.123l30-14c0.381-0.178 0.833-0.098 1.13 0.199s0.377 0.749 0.199 1.13l-14 30c-0.167 0.358-0.524 0.577-0.906 0.577zM5.508 14h11.492c0.552 0 1 0.448 1 1v11.492l10.931-23.423-23.423 10.931z"
        ></path>
      </svg>
    </div>
  </a>
</div>
<div class="main_block">
  <ul class="main_weather_data">
    <li class="a main_weather_data_temperature" id="main_weather_data_temperature">
    +${Math.round(data.current.temperature_2m)}°
      <img
        src="./img/meteocons-icons/SVG/30.svg"
        alt="main_weather_pic"
        class="main_weather_data_temperature_pic"
      />
    </li>
    <li class="b weather_description">
      <h3>Облачно с прояснениями</h3>
      <h4 class="weather_description_feel">
        Ощущается как +${Math.round(data.current.apparent_temperature)}°
        <span class="weather_description_feel_ass" id="apparent_temperature"></span>
      </h4>
    </li>
    <li class="c" id="wind_speed">
      <img
        src="./img/meteocons-icons/SVG/6.svg"
        alt="wind_speed_icon"
        class="weather_description_wind_speed_icon"
      />
    ${(data.current.wind_speed_10m * 0.277778).toFixed(1)}м/с
    </li>
    <li class="d" id="relative_humidity">
      <img
        src="./img/meteocons-icons/SVG/droplet.svg"
        alt="wet_icon"
        class="weather_description_wet_icon"
      />
    ${data.current.relative_humidity_2m}%
    </li>
    <li class="e" id="surface_pressure">
      <img
        src="./img/meteocons-icons/SVG/43.svg"
        alt="pressure_icon"
        class="weather_description_pressure_icon"
      />
    ${Math.round(data.current.surface_pressure)} мм рт.ст.
    </li>
  </ul>
</div>
<div class="slider">
<div class="line"></div>
<div class="circle_arrow_left"></div>
<div class="slider_content_wrapper">
  <div class="slider_time">18:00</div>
  <div class="slider_weather_picture">
    <img src="" alt="" />
  </div>
  <div class="slider_temperature">+24</div>
</div>
<div class="circle_arrow_right"></div>
</div>`;
    div.innerHTML = template;
    return div;
  };

  const WEATHER_ROOT = document.getElementById("weather_card");

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
    "cloud_cover",
    "weather_code",
  ];
  const CURRENT_INFO = `current=${INFO_KEYS.join(",")}`;
  const PAST_DAY = "past_days=1";

  const MAP = {
    cloud: {
      img: "",
      bg: "",
    },
    sun: {
      img: "",
      bg: "",
    },
    snow: {
      img: "",
      bg: "",
    },
  };
  const getCurrentWeather = (info) => {
    return "cloud";
  };

  // const MAP = {
  // ясно
  // малооблачно
  // облачно с прояснениями
  // небольшой дождь
  // дождь
  // снег
  // };

  const WEATHER_CODE = {
    0: {
      description: "Чистое небо",
      img: "",
    },
    1: "Преимущественно ясно",
    2: "Переменная облачность",
    3: "Облачно",
    45: "Туман",
    48: "Отложение инейного тумана",
    [51 || 53 || 55]: "Морось",
    [56 || 57]: "Ледяной дождь: легкий и плотный",
    [61 || 63 || 65]: "Дождь: слабый, умеренный и сильный",
    [66 || 67]: "Ледяной дождь: легкая и сильная интенсивность",
    [71 || 73 || 75]: "Снегопад: слабый, умеренный и сильный",
    77: "Снежные зерна",
    [80 || 81 || 82]: "Ливни: слабые, умеренные и сильные",
    [85 || 86]: "Снежные ливни слабые и сильные",
    95: "Гроза: Слабая или умеренная",
    [96 || 99]: "Гроза с небольшим и сильным градом",
  };

  const urlCurrentTemperature = `${API_URL}?${LATITUDE}&${LONGITUDE}&${PAST_DAY}&${CURRENT_INFO}`;

  const urlTemperature = await fetch(urlCurrentTemperature);
  const info = await urlTemperature.json();

  console.log("info:", WEATHER_CODE[info.current.weather_code]);

  // .then((info) => {
  //   // MAP[getCurrentWeather(info)];
  //   return info;
  // });
  WEATHER_ROOT?.append(generateContent(info));

  // console.log({ info });
})();
