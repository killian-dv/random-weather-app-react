import { useState } from "react";
import "./App.css";
import { RandomCityService } from "./services/random-city";
import { weatherApi } from "./api/weather-info";
import { LoaderIcon } from "./components/LoaderIcon/LoaderIcon";

function App() {
  async function getRandomCityData() {
    const cityData = RandomCityService.getRandomCityData();
    console.log("City data:", cityData);
    // console.log("City name:", cityData.name);
    // console.log("City latitude:", cityData.latitude);
    const weather = await weatherApi.getWeatherData(
      cityData.latitude,
      cityData.longitude
    );
    console.log("Weather data:", weather);
  }

  return (
    <div className="App">
      <button onClick={getRandomCityData}>Obtenir une ville aléatoire</button>
      <LoaderIcon />
    </div>
  );
}

export default App;
