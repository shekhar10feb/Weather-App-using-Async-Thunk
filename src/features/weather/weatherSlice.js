import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeatherByCity } from "./weatherAPI";

// Async thunk for fetching weather data
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (cityName, { rejectWithValue }) => {
    try {
      const data = await getWeatherByCity(cityName);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch weather");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    status: "idle",
    error: null,
    lastSearched: localStorage.getItem("lastCity") || "",
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (city) => city !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.lastSearched = action.payload.name;
        localStorage.setItem("lastCity", action.payload.name);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;

