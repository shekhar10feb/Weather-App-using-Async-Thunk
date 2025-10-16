import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityWeather from "./pages/CityWeather";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/city/:name" element={<CityWeather />} />
    </Routes>
  );
}

export default App;
