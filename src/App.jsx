import { useState } from "react";
import "./App.css";
import { RandomCityService } from "./services/random-city";

function App() {
  function getRandomCityData() {
    const cityData = RandomCityService.getRandomCityData();
    console.log("City data:", cityData);
  }

  return (
    <div className="App">
      <button onClick={getRandomCityData}>Obtenir une ville aléatoire</button>
    </div>
  );
}

export default App;
