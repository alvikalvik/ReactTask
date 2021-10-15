import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { SelectedLocationType } from '../types/types';
import { connect } from 'react-redux';
import Preloader from '../components/Preloader/Preloader';
import { WEATHER_UPDATE_INTERVAL } from '../constants/constants';
import updateAllSelectedLocationsData from '../actions/SelectedLocationsActions';

class SelectedLocationsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.timerId = null;
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      if (this.props.isTokenReceived && !this.props.isDataFetchnig) {
        this.props.updateAllSelectedLocationsData();
      }
    }, WEATHER_UPDATE_INTERVAL);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isTokenReceived &&
      !this.props.isDataFetchnig &&
      !this.props.selectedLocations &&
      !prevProps.selectedLocations
    ) {
      this.props.updateAllSelectedLocationsData();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    if (this.props.isDataFetchnig || !this.props.isTokenReceived) {
      return (
        <div className="location-weather">
          <Preloader />
        </div>
      );
    }

    return <SelectedLocations selectedLocations={this.props.selectedLocations} />;
  }
}

LocationWeatherContainer.propTypes = {
  isDataFetchnig: PropTypes.bool.isRequired,
  isTokenReceived: PropTypes.bool.isRequired,
  selectedLocations: PropTypes.arrayOf(SelectedLocationType),
  updateAllSelectedLocationsData: PropTypes.func.isRequired
};

LocationWeatherContainer.defaultProps = {
  selectedLocations: null
};

const mapStateToProps = state => {
  return {
    isDataFetchnig: state.serverApi.isFetchingInProgress,
    isTokenReceived: state.serverApi.isTokenReceived,
    selectedLocations: state.selectedLocations
  };
};

export default connect(mapStateToProps, {
  updateAllSelectedLocationsData
})(SelectedLocationsContainer);
