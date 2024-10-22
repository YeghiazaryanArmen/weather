import {FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
}from './weatherAction';

const initialState = {
  loading: false,
  weatherData: [],
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_WEATHER_SUCCESS:
      return { ...state, loading: false, weatherData: action.payload, error: null };
    case FETCH_WEATHER_FAILURE:
      return { ...state, loading: false, weatherData: [], error: action.payload };
    default:
      return state;
  }
};

export default weatherReducer;
