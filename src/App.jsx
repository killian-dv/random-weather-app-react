import { useState, useEffect } from "react";
import style from "./style.module.css";
import { RandomCityService } from "./services/random-city";
import { weatherApi } from "./api/weather-info";
import { LoaderScreen } from "./components/LoaderScreen/LoaderScreen";
import { Footer } from "./components/Footer/Footer";
import { ActualWeatherIcon } from "./components/ActualWeatherIcon/ActualWeatherIon";
import { ActualWeatherDescription } from "./components/ActualWeatherDescription/ActualWeatherDescription";

function App() {
  async function getWeatherRandomCity() {
    const cityData = RandomCityService.getRandomCityData();
    console.log("City data:", cityData);
    const weatherData = await weatherApi.getWeatherData(
      cityData.latitude,
      cityData.longitude
    );

    // const weatherData = {
    //   coord: {
    //     lon: 45.3438,
    //     lat: 2.0371,
    //   },
    //   weather: [
    //     {
    //       id: 802,
    //       main: "Clouds",
    //       description: "partiellement nuageux",
    //       icon: "03n",
    //     },
    //   ],
    //   base: "stations",
    //   main: {
    //     temp: 26.93,
    //     feels_like: 29.41,
    //     temp_min: 26.93,
    //     temp_max: 26.93,
    //     pressure: 1011,
    //     humidity: 78,
    //   },
    //   visibility: 10000,
    //   wind: {
    //     speed: 7.2,
    //     deg: 200,
    //   },
    //   clouds: {
    //     all: 40,
    //   },
    //   dt: 1694878971,
    //   sys: {
    //     type: 1,
    //     id: 2497,
    //     country: "SO",
    //     sunrise: 1694832604,
    //     sunset: 1694876252,
    //   },
    //   timezone: 10800,
    //   id: 53654,
    //   name: "Mogadiscio",
    //   cod: 200,
    // };
    console.log("Weather data:", weatherData);
    console.log("call api");
    console.log("weather", weatherData.weather[0].icon);
    // console.log("getWeatherRandomCity");

    // Mise à jour de l'état avec les données météorologiques
    setWeather(weatherData);
    setRandomCityFetched(true);
  }

  const [showLoader, setShowLoader] = useState(false);
  const [randomCityFetched, setRandomCityFetched] = useState(false);
  const [scrollInProgress, setScrollInProgress] = useState(false);
  const [weather, setWeather] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

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

  useEffect(() => {
    // Au moment du rendu, activez l'animation en ajoutant la classe 'enter'
    setShowDescription(true);

    // Ajoutez un délai pour déclencher le retrait de la classe 'enter' après l'animation
    const timeoutId = setTimeout(() => {
      setShowDescription(false);
    }, 500); // 500ms est la même durée que la transition CSS

    // Nettoyez le timeout lors de la sortie du composant ou du changement de dépendances
    return () => clearTimeout(timeoutId);
  }, []); // Effectuer cette animation uniquement lors du montage initial

  const weatherIcon = weather?.weather[0]?.icon || "";
  const temperature = weather?.main?.temp || "";
  const cityName = weather?.name || "";
  const weatherDescription = weather?.weather[0]?.description || "";

  return (
    <div className={style.app}>
      <main className={style.main}>
        {randomCityFetched && weather && (
          <>
            <ActualWeatherIcon icon={weatherIcon} />
            <ActualWeatherDescription
              className={`${style.actual_weather_description} ${
                showDescription ? "enter" : ""
              }`}
              temperature={temperature}
              cityName={cityName}
              weatherDescription={weatherDescription}
              icon={weatherIcon}
            />
          </>
        )}
      </main>
      <Footer className={style.footer} />
      {showLoader && <LoaderScreen />}
    </div>
  );
}

export default App;
