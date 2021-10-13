import React, { Component, PureComponent } from 'react';
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
  setCurrentLocationDetailedWeather,
  getCurrentLocationData
} from '../actions/currentLocationActions';
import { connect } from 'react-redux';

class LocationWeatherContainer extends PureComponent {
    
    componentDidUpdate(prevProps) {
        // !!!! Find out condition of renew!!!!!!!




        // this.props.getCurrentLocationData();
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
  setCurrentLocationDetailedWeather,
  getCurrentLocationData
})(LocationWeatherContainer);
