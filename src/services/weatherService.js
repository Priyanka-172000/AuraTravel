import axios from 'axios';

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCoords = async (lat, lon) => {
  if (!WEATHER_API_KEY) {
    throw new Error("Weather API key is missing");
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric' // Celsius
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
