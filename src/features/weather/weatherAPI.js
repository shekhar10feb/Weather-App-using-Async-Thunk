// src/features/weather/weatherAPI.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const QUERY = import.meta.env.VITE_QUERY;

// Get current weather by city
export const getWeatherByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/${QUERY}`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

// (Optional) Get 5-day forecast by city
export const getForecastByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};
