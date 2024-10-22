import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherAction'; 
import { selectWeatherData } from '../redux/selectors'; 

const WeatherComponent = ({ city }) => {
  const dispatch = useDispatch();
  const weatherData = useSelector(selectWeatherData); 
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  }, [city, dispatch],
console.log(city));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Weather in {city}</h1>
      {weatherData && weatherData.length > 0 ? (
        <ul>
          {weatherData.map((weather) => (
            <li key={weather.dt}>
              <h2>{weather.main}</h2>
              <p>{weather.description}</p>
              <p>Temperature: {weather.temp}°C</p>
              <p>Date and Time: {new Date(weather.dt * 1000).toLocaleString()}</p> {/* Convert Unix timestamp */}
              <img 
                src={`http://openweathermap.org/img/wn/${weather.icon}.png`} 
                alt={weather.description} 
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>No weather data available.</div>
      )}
    </div>
  );
};

export default WeatherComponent;
