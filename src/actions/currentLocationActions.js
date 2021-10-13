import {
  SET_CURRENT_LOCATION_DAILY_WEATHER,
  SET_CURRENT_LOCATION_INFO,
  SET_CURRENT_LOCATION_WEATHER
} from '../actionTypes';
import {
  API_DEFAULT_ID,
  API_FORECAST_DAILY_ENDPOINT,
  API_FORECAST_DETAILED_ENDPOINT,
  API_FORECAST_DETAILED_PERIODS
} from '../constants/constants';
import {
  weatherAPI
} from '../services/dataService';
import {
  setFetchingError,
  setIsFetchingInProgress
} from './ServerApiActions';

export const setCurrentLocationInfo = info => ({
  type: SET_CURRENT_LOCATION_INFO,
  payload: {
    info
  }
});

export const setCurrentLocationWeather = weather => ({
  type: SET_CURRENT_LOCATION_WEATHER,
  payload: {
    weather
  }
});

export const setCurrentLocationDailyWeather = dailyWeather => ({
  type: SET_CURRENT_LOCATION_DAILY_WEATHER,
  payload: {
    dailyWeather
  }
});

export const setCurrentLocationDetailedWeather = detailedWeather => ({
  type: SET_CURRENT_LOCATION_DETAILED_WEATHER,
  payload: {
    detailedWeather
  }
});

export const getCurrentLocationData = () => async (dispatch, getState) => {  
  if (getState().serverApi.isTokenReceived && !getState().serverApi.isFetchingInProgress) {
    dispatch(setIsFetchingInProgress(true));

    try {
      const currentLocationInfo = await weatherAPI.getLocationInfo(
        getState().geoDetection.position ?
        `${getState().geoDetection.position.coords.longitude},${getState().geoDetection.position.coords.latitude}` :
        API_DEFAULT_ID
      );
      dispatch(setCurrentLocationInfo(currentLocationInfo));

      // const currentLocationWeather = weatherAPI.getCurrentWeather(
      //   getState().currentLocation.info.id
      // );
      // const currentLocationDailyWeather = weatherAPI.getForecast(
      //   API_FORECAST_DAILY_ENDPOINT,
      //   getState().currentLocation.info.id
      // );
      // const currentLocationDetailedWeather = weatherAPI.getForecast(
      //   API_FORECAST_DETAILED_ENDPOINT,
      //   getState().currentLocation.info.id, {
      //     periods: API_FORECAST_DETAILED_PERIODS
      //   }
      // );

      // await Promise.all(currentLocationWeather, currentLocationDailyWeather, currentLocationDetailedWeather);

      // dispatch(setCurrentLocationWeather(currentLocationWeather));
      // dispatch(setCurrentLocationDailyWeather(currentLocationDailyWeather));
      // dispatch(setCurrentLocationDetailedWeather(currentLocationDetailedWeather));

    } catch (error) {
      dispatch(setFetchingError(error))
    }

    dispatch(setIsFetchingInProgress(false));
  }
};