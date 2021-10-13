import {
  SET_CURRENT_LOCATION_DAILY_WEATHER,
  SET_CURRENT_LOCATION_INFO,
  SET_CURRENT_LOCATION_WEATHER
} from '../actionTypes';

export const setCurrentLocationInfo = info => ({
  type: SET_CURRENT_LOCATION_INFO,
  payload: { info }
});

export const setCurrentLocationWeather = weather => ({
  type: SET_CURRENT_LOCATION_WEATHER,
  payload: { weather }
});

export const setCurrentLocationDailyWeather = dailyWeather => ({
  type: SET_CURRENT_LOCATION_DAILY_WEATHER,
  payload: { dailyWeather }
});

export const setCurrentLocationDetailedWeather = detailedWeather => ({
  type: SET_CURRENT_LOCATION_DETAILED_WEATHER,
  payload: { detailedWeather }
});
