import { useState, useEffect } from "react";
import style from "./style.module.css";
import { RandomCityService } from "./services/random-city";
import { weatherApi } from "./api/weather-info";
import { LoaderScreen } from "./components/LoaderScreen/LoaderScreen";
import { Footer } from "./components/Footer/Footer";

function App() {
  async function getWeatherRandomCity() {
    // const cityData = RandomCityService.getRandomCityData();
    // console.log("City data:", cityData);
    // const weather = await weatherApi.getWeatherData(
    //   cityData.latitude,
    //   cityData.longitude
    // );
    // console.log("Weather data:", weather);
    console.log("getWeatherRandomCity");
  }

  const [showLoader, setShowLoader] = useState(false);
  const [randomCityFetched, setRandomCityFetched] = useState(false);
  const [scrollInProgress, setScrollInProgress] = useState(false);

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
        <button onClick={getWeatherRandomCity}>
          Obtenir une ville aléatoire
        </button>
      </main>
      <Footer className={style.footer} />
      {showLoader && <LoaderScreen />}
    </div>
  );
}

export default App;
