import style from "./style.module.css";

import clearSkyBlack from "../../assets/images/clear-sky-black.png";
import cloudsBlack from "../../assets/images/clouds-black.png";
import fewCloudsBlack from "../../assets/images/few-clouds-black.png";
import mistBlack from "../../assets/images/mist-black.png";
import rainBlack from "../../assets/images/rain-black.png";
import showerRainBlack from "../../assets/images/shower-rain-black.png";
import snowBlack from "../../assets/images/snow-black.png";
import thunderstormBlack from "../../assets/images/thunderstorm-black.png";

function getWeatherIcon(icon) {
  switch (icon) {
    case "01n":
    case "01d":
      return clearSkyBlack;
    case "02n":
    case "02d":
      return fewCloudsBlack;
    case "03n":
    case "03d":
    case "04n":
    case "04d":
      return cloudsBlack;
    case "09n":
    case "09d":
      return showerRainBlack;
    case "10n":
    case "10d":
      return rainBlack;
    case "11n":
    case "11d":
      return thunderstormBlack;
    case "13n":
    case "13d":
      return snowBlack;
    case "50n":
    case "50d":
      return mistBlack;
  }
}

export function ActualWeatherDescription({
  temperature,
  cityName,
  weatherDescription,
  icon,
}) {
  const weatherIconBlack = getWeatherIcon(icon);

  return (
    <div className={style.container}>
      <h1>{Math.round(temperature)}°</h1>
      <div>
        <img src={weatherIconBlack} alt="weather icon black" />
        <p>{weatherDescription}</p>
      </div>
      <h2>{cityName}</h2>
    </div>
  );
}
