import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchWeather,
  addFavorite,
  removeFavorite,
} from "../features/weather/weatherSlice";

const CityWeather = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, status, error, favorites } = useSelector(
    (state) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather(name));
  }, [name, dispatch]);

  const isFav = favorites.includes(name);

  if (status === "loading")
    return <p className="text-center mt-10">Loading...</p>;
  if (status === "failed")
    return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      {data && (
        <div className="bg-white shadow-md rounded p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
          <p className="text-lg">🌡️ {data.main.temp}°C</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
          <p className="capitalize">☁️ {data.weather[0].description}</p>

          <div className="flex justify-between items-center flex-col">
            <button
              onClick={() =>
                dispatch(isFav ? removeFavorite(name) : addFavorite(name))
              }
              className={`mt-4 px-4 py-2 rounded ${
                isFav ? "bg-red-500" : "bg-yellow-400"
              } text-white`}
            >
              {isFav ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <button
              className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityWeather;
