import FooterWrapper from './layouts/FooterWrapper/FooterWrapper';
import HeaderWrapper from './layouts/HeaderWrapper/HeaderWrapper';

import 'normalize.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import {
  API_AUTH_PASS,
  API_AUTH_USERNAME,
  API_FORECAST_DAILY_ENDPOINT,
  API_FORECAST_DETAILED_ENDPOINT,
  API_KIEV_ID,
  THEME_DARK,
  THEME_LIGHT
} from './constants/constants';
import { weatherAPI } from './services/dataService';
import ContentWrapperContainer from './containers/ContentWrapperContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getToken } from './actions/ServerApiActions';
import { getPosition } from './actions/GeoDetectionActions';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.name);
  const { isTokenReceived, tokenExpirationTime, fetchingError } = useSelector(
    state => state.serverApi
  );
  // weatherAPI.getToken(API_AUTH_USERNAME, API_AUTH_PASS).then(() => {
  //   weatherAPI.searchLocation('Moscow').then(locations => console.log(locations));
  //   weatherAPI.getCurrentWeather(API_KIEV_ID).then(weather => console.log(weather));
  //   weatherAPI
  //     .getForecast(API_FORECAST_DETAILED_ENDPOINT, API_KIEV_ID)
  //     .then(forecast => console.log(forecast));
  //   weatherAPI
  //     .getForecast(API_FORECAST_DAILY_ENDPOINT, API_KIEV_ID)
  //     .then(forecast => console.log(forecast));
  // });

  useEffect(() => {
    //get Geo location here
    dispatch(getPosition());
  }, []);

  useEffect(() => {
    //get token initially or if it's expired
    if (
      (!isTokenReceived || (tokenExpirationTime && tokenExpirationTime <= Number(new Date()))) &&
      !fetchingError
    ) {
      dispatch(getToken());
    }
  }, [isTokenReceived, tokenExpirationTime, fetchingError, dispatch]);

  return (
    <BrowserRouter>
      <div className={['global-wrapper', `theme-mode_${theme}`].join(' ')}>
        <HeaderWrapper />
        <ContentWrapperContainer />
        <FooterWrapper />
      </div>
    </BrowserRouter>
  );
}

export default App;
