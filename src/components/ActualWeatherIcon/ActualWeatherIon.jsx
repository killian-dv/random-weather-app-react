import style from "./style.module.css";
import clearSky from "../../assets/images/clear-sky.png";
import clouds from "../../assets/images/clouds.png";
import fewClouds from "../../assets/images/few-clouds.png";
import mist from "../../assets/images/mist.png";
import rain from "../../assets/images/rain.png";
import showerRain from "../../assets/images/shower-rain.png";
import snow from "../../assets/images/snow.png";
import thunderstorm from "../../assets/images/thunderstorm.png";

function getWeatherIcon(icon) {
  switch (icon) {
    case "01n":
    case "01d":
      return clearSky;
    case "02n":
    case "02d":
      return fewClouds;
    case "03n":
    case "03d":
    case "04n":
    case "04d":
      return clouds;
    case "09n":
    case "09d":
      return showerRain;
    case "10n":
    case "10d":
      return rain;
    case "11n":
    case "11d":
      return thunderstorm;
    case "13n":
    case "13d":
      return snow;
    case "50n":
    case "50d":
      return mist;
  }
}

export function ActualWeatherIcon({ icon }) {
  const weatherIcon = getWeatherIcon(icon);

  return (
    <div className={style.container}>
      <img src={weatherIcon} alt="Weather icon" className={style.img} />
    </div>
  );
}
