import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchWeather } from "../features/weather/weatherSlice";
import { Link, useNavigate } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const { data, status, error, lastSearched, favorites } = useSelector(
    (state) => state.weather
  );

  const handleSearch = () => {
    if (city.trim()) {
      dispatch(fetchWeather(city));
      setCity("");
    }
  };

  const handleCardClick = () => {
    if (data) navigate(`/city/${data.name}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-4">🌦️ Weather Forecast</h1>

      {/* Search box */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-64"
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Loading / Error / Result */}
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Display Weather Result */}
      {data && status === "succeeded" && (
        <div className="mb-6">
          <WeatherCard data={data} onClick={handleCardClick} />
        </div>
      )}

      {/* Favorites */}
      <div className="flex justify-center items-start flex-row mt-6 space-x-2">
        <div className="flex flex-wrap gap-2 justify-center flex-col rounded shadow p-3 bg-white">
          <h2 className="text-lg font-semibold">⭐ Favorites</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {favorites.map((fav) => (
              <Link
                key={fav}
                to={`/city/${fav}`}
                className="bg-yellow-200 px-3 py-1 rounded hover:bg-yellow-300"
              >
                {fav}
              </Link>
            ))}
            {favorites.length === 0 && <p>No favorites yet.</p>}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center shadow rounded p-3 bg-white">
          {lastSearched ? (
            <div className="flex justify-center items-center flex-col">
              <p className="text-lg font-semibold mb-2">Last searched</p>
              <p>{lastSearched}</p>
            </div>
          ) : (
            <p>No last searched yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
