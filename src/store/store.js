import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice.js";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
