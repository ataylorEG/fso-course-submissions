import { useState } from 'react';

const useWeather = (api_key) => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (lat, lon) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await fetch(weatherURL);
    const data = await response.json();

    setWeather({
      temperature: data.main.temp,
      icon: data.weather[0].icon,
      wind: data.wind.speed,
    });
  };

  return [weather, fetchWeather];
};

export default useWeather;