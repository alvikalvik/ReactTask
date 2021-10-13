import './LocationWeather.css';
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
import LocationWeatherCurrentInfo from './LocationWeatherCurrentInfo/LocationWeatherCurrentInfo';
import LocationWeatherDailyList from './LocationWeatherDailyList/LocationWeatherDailyList';
import LocationWeatherDetailedList from './LocationWeatherDetailedList/LocationWeatherDetailedList';
import Preloader from '../Preloader/Preloader';

class LocationWeather extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {      
      activeDayDate: new Date().setHours(0, 0, 0, 0)
    };

    this.setActiveDayDate = this.setActiveDayDate.bind(this);
  }

  setActiveDayDate(date) {
    this.setState({ activeDayDate: new Date(date).setHours(0, 0, 0, 0) });
  }

  render() {
    if (!this.props.isDataFetchnig) {
      return (
        <div className="location-weather">
          <Preloader />
        </div>
      );
    }

    return (
      <div className="location-weather">
        <LocationWeatherCurrentInfo
          currentLocationWeather={this.props.currentLocationWeather}
          currentLocationInfo={this.props.currentLocationInfo}
        />
        <LocationWeatherDailyList
          currentLocationDailyWeather={this.props.currentLocationDailyWeather}
          activeDayDate={this.state.activeDayDate}
          setActiveDayDate={this.setActiveDayDate}
        />
        <LocationWeatherDetailedList
          currentLocationDetailedWeather={this.props.currentLocationDetailedWeather}
          activeDayDate={this.state.activeDayDate}
        />
      </div>
    );
  }
}

export default LocationWeather;
