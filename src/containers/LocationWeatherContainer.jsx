import React, { Component, PureComponent } from 'react';
import {
  API_AUTH_PASS,
  API_AUTH_USERNAME,
  API_FORECAST_DETAILED_PERIODS,
  API_DEFAULT_ID,
  API_FORECAST_DAILY_ENDPOINT,
  API_FORECAST_DETAILED_ENDPOINT
} from '../../constants/constants';
import { weatherAPI } from '../../services/dataService';
import PropTypes from 'prop-types';
import LocationWeather from '../components/LocationWeather/LocationWeather';
import {
  CurrentLocationDailyWeatherType,
  CurrentLocationDetailedWeatherType,
  CurrentLocationInfoType,
  CurrentLocationWeatherType
} from '../types/types';
import {
  setCurrentLocationInfo,
  setCurrentLocationWeather,
  setCurrentLocationDailyWeather,
  setCurrentLocationDetailedWeather
} from '../actions/currentLocationActions';

class LocationWeatherContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeDayDate: 0,
      defaultLocationId: API_DEFAULT_ID,
      currentLocationInfo: null,
      currentLocationWeather: null,
      currentLocationDailyWeather: null,
      currentLocationDetailedWeather: null
    };

    this.setActiveDayDate = this.setActiveDayDate.bind(this);
  }

  componentDidMount() {
    (async () => {
      try {
        let geoPosition = null;
        navigator.geolocation.getCurrentPosition(
          position => {
            geoPosition = position;
          },
          error => {
            console.log('Could not get geo position from browser', error);
          }
        );

        await weatherAPI.getToken(API_AUTH_USERNAME, API_AUTH_PASS);

        const currentLocationInfo = await weatherAPI.getLocationInfo(
          geoPosition
            ? `${geoPosition.coords.longitude},${geoPosition.coords.latitude}`
            : this.state.defaultLocationId
        );
        this.setState({ currentLocationInfo });

        const currentLocationWeather = await weatherAPI.getCurrentWeather(
          this.state.currentLocationInfo.id
        );
        this.setState({
          currentLocationWeather,
          activeDayDate: new Date(currentLocationWeather.time).setHours(0, 0, 0, 0)
        });

        const currentLocationDailyWeather = await weatherAPI.getForecast(
          API_FORECAST_DAILY_ENDPOINT,
          this.state.currentLocationInfo.id
        );
        this.setState({ currentLocationDailyWeather });

        const currentLocationDetailedWeather = await weatherAPI.getForecast(
          API_FORECAST_DETAILED_ENDPOINT,
          this.state.currentLocationInfo.id,
          { periods: API_FORECAST_DETAILED_PERIODS }
        );
        this.setState({ currentLocationDetailedWeather });
        console.log(currentLocationDetailedWeather);
      } catch (error) {
        console.log(error);
      }
    })();
  }

  setActiveDayDate(date) {
    this.setState({ activeDayDate: new Date(date).setHours(0, 0, 0, 0) });
  }

  render() {
    return (
      <LocationWeather
        isDataFetchnig={this.props.isDataFetchnig}
        currentLocationInfo={this.props.currentLocationInfo}
        currentLocationWeather={this.props.currentLocationWeather}
        currentLocationDailyWeather={this.props.currentLocationDailyWeather}
        currentLocationDetailedWeather={this.props.currentLocationDetailedWeather}
      />
    );
  }
}

LocationWeatherContainer.propTypes = {
  isDataFetchnig: PropTypes.bool.isRequired,
  currentLocationInfo: CurrentLocationInfoType,
  currentLocationWeather: CurrentLocationWeatherType,
  currentLocationDailyWeather: CurrentLocationDailyWeatherType,
  currentLocationDetailedWeather: CurrentLocationDetailedWeatherType
};

const mapStateToProps = state => {
  return {
    isDataFetchnig: state.serverApi.isFetchingInProgress,
    currentLocationInfo: state.currentLocation.info,
    currentLocationWeather: state.currentLocation.weather,
    currentLocationDailyWeather: state.currentLocation.dailyWeather,
    currentLocationDetailedWeather: state.currentLocation.detailedWeather
  };
};

export default connect(mapStateToProps, {
  setCurrentLocationInfo,
  setCurrentLocationWeather,
  setCurrentLocationDailyWeather,
  setCurrentLocationDetailedWeather
})(LocationWeatherContainer);
