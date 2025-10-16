// src/components/WeatherCard.jsx
export default function WeatherCard({ data, onClick }) {
  if (!data) return null;

  const { name, main, weather } = data;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-all text-center"
    >
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600 capitalize">{weather[0].description}</p>

      <div className="flex justify-center items-center mt-3 gap-3">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt="icon"
          className="w-16 h-16"
        />
        <div>
          <p className="text-2xl font-bold">{main.temp}°C</p>
          <p className="text-sm">💧 {main.humidity}% humidity</p>
        </div>
      </div>
    </div>
  );
}
