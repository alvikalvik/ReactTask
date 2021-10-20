import PropTypes from 'prop-types';
import { CurrentLocationInfoType } from '../../types/types';
import Preloader from '../Preloader/Preloader';
import './LocationsSearch.css';
import LocationsSearchReuslts from './LocationsSearchReuslts/LocationsSearchReuslts';

function LocationsSearch({ isReadyForSearch, searchResults, clearSearch, searchLocations }) {
  return (
    <div className="locations-search">
      <h2 className="locations-search__title">Search for location</h2>
      <input type="text" className="locations-search__input" placeholder="search query" />
      <div className="locations-search__input-description">at least 3 characters</div>
      {isReadyForSearch ? <LocationsSearchReuslts searchResults={searchResults} /> : <Preloader />}
    </div>
  );
}

LocationsSearch.propTypes = {
  isReadyForSearch: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(CurrentLocationInfoType).isRequired,
  clearSearch: PropTypes.func.isRequired,
  searchLocations: PropTypes.func.isRequired
};

export default LocationsSearch;
