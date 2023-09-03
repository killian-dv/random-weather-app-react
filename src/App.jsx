import { useState, useEffect } from "react";
import style from "./style.module.css";
import { RandomCityService } from "./services/random-city";
import { weatherApi } from "./api/weather-info";
import { LoaderScreen } from "./components/LoaderScreen/LoaderScreen";
import { Footer } from "./components/Footer/Footer";
import { ActualWeatherIcon } from "./components/ActualWeatherIcon/ActualWeatherIon";

function App() {
  async function getWeatherRandomCity() {
    const cityData = RandomCityService.getRandomCityData();
    // console.log("City data:", cityData);
    const weatherData = await weatherApi.getWeatherData(
      cityData.latitude,
      cityData.longitude
    );
    // console.log("Weather data:", weather);
    console.log("call api");
    console.log("weather", weatherData.weather[0].icon);
    // console.log("getWeatherRandomCity");

    // Mise à jour de l'état avec les données météorologiques
    setWeather(weatherData);
  }

  const [showLoader, setShowLoader] = useState(false);
  const [randomCityFetched, setRandomCityFetched] = useState(false);
  const [scrollInProgress, setScrollInProgress] = useState(false);
  const [weather, setWeather] = useState(null);

  const handleScroll = async () => {
    if (!scrollInProgress) {
      setScrollInProgress(true);
      setShowLoader(true);

      try {
        await getWeatherRandomCity();
        setRandomCityFetched(true);
      } catch (error) {
        console.error("Erreur lors de l'appel à getWeatherRandomCity", error);
      } finally {
        setTimeout(() => {
          setShowLoader(false);
          setScrollInProgress(false);
        }, 5600); // Durée de l'animation de chargement
      }
    }
  };

  useEffect(() => {
    getWeatherRandomCity();

    const handleInteraction = () => {
      if (!scrollInProgress && !showLoader) {
        handleScroll();
        console.log("handleInteraction");
      }
    };

    window.addEventListener("wheel", handleInteraction);
    window.addEventListener("touchmove", handleInteraction);

    return () => {
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchmove", handleInteraction);
    };
  }, []);

  return (
    <div className={style.app}>
      <main className={style.main}>
        {randomCityFetched && weather && (
          <ActualWeatherIcon icon={weather.weather[0].icon} />
        )}
      </main>
      <Footer className={style.footer} />
      {showLoader && <LoaderScreen />}
    </div>
  );
}

export default App;
