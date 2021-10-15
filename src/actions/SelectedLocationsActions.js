import {
  PUT_SELECTED_LOCATION,
  DELETE_SELECTED_LOCATION,
  CLEAR_SELECTED_LOCATIONS
} from '../actionTypes';
import {
  API_DEFAULT_ID,
  API_FORECAST_DAILY_ENDPOINT,
  API_FORECAST_DETAILED_ENDPOINT,
  API_FORECAST_DETAILED_PERIODS
} from '../constants/constants';
import { weatherAPI } from '../services/dataService';
import { setFetchingError, setIsFetchingInProgress } from './ServerApiActions';

export const putSelectedLocation = locationData => ({
  type: PUT_SELECTED_LOCATION,
  payload: locationData
});

export const deleteSelectedLocation = id => ({
  type: DELETE_SELECTED_LOCATION,
  payload: {
    id
  }
});

export const clearSelectedLocations = () => ({
  type: CLEAR_SELECTED_LOCATIONS
});

export const updateAllSelectedLocationsData = () => async (dispatch, getState) => {
  if (getState().serverApi.isTokenReceived && !getState().serverApi.isFetchingInProgress) {
    dispatch(setIsFetchingInProgress(true));

    const selectedLocations = getState().selectedLocations;

    try {
      selectedLocations.forEach(location => {
        const locationInfo = weatherAPI.getLocationInfo(location.id);
        const locationWeather = weatherAPI.getCurrentWeather(location.id);

        const [locationInfoResult, locationWeatherResult] = await Promise.all([
          locationInfo,
          locationWeather
        ]);

        dispatch(
          putSelectedLocation({
            id: location.id,
            locationInfo: locationInfoResult,
            locationWeather: locationWeatherResult
          })
        );
      });
    } catch (error) {
      dispatch(setFetchingError(error));
      console.log(error);
    }

    dispatch(setIsFetchingInProgress(false));
  }
};
