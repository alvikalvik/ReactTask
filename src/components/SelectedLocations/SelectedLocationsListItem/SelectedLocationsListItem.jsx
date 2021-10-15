import PropTypes from 'prop-types';
import {
  API_SYMBOL_URL_POSTFIX,
  API_SYMBOL_URL_PREFIX,
  LOCATIONS_PAGE_LINK
} from '../../../constants/constants';
import { SelectedLocationType } from '../../../types/types';
import { formatTemperature } from '../../../utils/utils';
import './SelectedLocationsListItem.css';

function SelectedLocationsListItem({ id, locationInfo, locationWeather }) {
  return (
    <li className="selected-locations__list-item">
      <a href={`${LOCATIONS_PAGE_LINK}/${id}`} className="selected-locations__list-item-link">
        <h3 className="selected-locations__list-item-title">{locationInfo.name}</h3>
        <img
          src={`${API_SYMBOL_URL_PREFIX}${locationWeather.symbol}${API_SYMBOL_URL_POSTFIX}`}
          alt={locationWeather.symbolPhrase}
          className="selected-locations__list-item-symbol-img"
        />
        <div className="selected-locations__list-item-temperature">
          {`${formatTemperature(locationWeather.temperature)}°`}
        </div>
      </a>
      <button className="selected-locations__list-item-remove-btn">Remove</button>
    </li>
  );
}

SelectedLocationsListItem.propTypes = {
  locationData: SelectedLocationType.isRequired
};

export default SelectedLocationsListItem;
