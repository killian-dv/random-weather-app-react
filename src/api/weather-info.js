import axios from "axios";

const lang = "fr";

export class weatherApi {
  static async getWeatherData(lat, lon) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`
    );
    return response.data;
  }
}
