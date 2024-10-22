import { createSelector } from 'reselect';

const selectWeatherState = (state) => state.weather;


export const selectWeatherData = createSelector(
  [selectWeatherState],
  (weatherState) => weatherState.data 
);
