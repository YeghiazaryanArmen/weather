import axios from "axios";

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});

export const fetchWeatherSuccess = (weatherData) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: weatherData,
});

export const fetchWeatherFailure = (error) => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

export const fetchWeather = (city) => {
  return async (dispatch) => {
    dispatch(fetchWeatherRequest());
    try {
      const apiKey = '9ba6b7c958988fc721ed486aa1395421';
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      // Check if the data has the expected structure
      console.log('API Response:', data);

      if (!data.list) {
        throw new Error('No weather data found');
      }

      const weatherData = data.list.map(weather => ({
        id: weather.dt,
        main: weather.weather[0].main,
        description: weather.weather[0].description,
        icon: weather.weather[0].icon,
        temperature: weather.main.temp,
        datetime: weather.dt_txt,
      }));

      dispatch(fetchWeatherSuccess(weatherData));
    } catch (error) {
      console.error('Fetch weather error:', error);
      dispatch(fetchWeatherFailure(error.message || 'Failed to fetch weather data.'));
    }
  };
};
