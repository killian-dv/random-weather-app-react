import { useState, useEffect } from "react";
import "./App.css";
import { RandomCityService } from "./services/random-city";
import { weatherApi } from "./api/weather-info";
import { LoaderScreen } from "./components/LoaderScreen/LoaderScreen";

function App() {
  async function getRandomCityData() {
    const cityData = RandomCityService.getRandomCityData();
    console.log("City data:", cityData);
    const weather = await weatherApi.getWeatherData(
      cityData.latitude,
      cityData.longitude
    );
    console.log("Weather data:", weather);
  }

  const [showLoader, setShowLoader] = useState(false);

  const handleScroll = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 5600); // 5.6s en millisecondes
  };

  useEffect(() => {
    const handleInteraction = () => {
      handleScroll();
    };

    window.addEventListener("wheel", handleInteraction);

    // Ajoutez également l'écouteur pour les écrans tactiles
    window.addEventListener("touchmove", handleInteraction);

    return () => {
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
    };
  }, []);

  return (
    <div className="App">
      <button onClick={getRandomCityData}>Obtenir une ville aléatoire</button>
      {showLoader && <LoaderScreen />}
    </div>
  );
}

export default App;
