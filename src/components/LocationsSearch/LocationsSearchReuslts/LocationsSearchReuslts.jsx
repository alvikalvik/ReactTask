import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LOCATIONS_PAGE_LINK } from '../../../constants/constants';
import { CurrentLocationInfoType } from '../../../types/types';
import './LocationsSearchReuslts.css';

function LocationsSearchReuslts({ searchResults }) {
  return (
    <ul className="locations-search__results">
      {searchResults.map(({ id, name, country }) => {
        return (
          <li key={id} className="locations-search__results-item">
            <Link to={`${LOCATIONS_PAGE_LINK}/${id}`} className="locations-search__results-link">
              {`${name}, ${country}`}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

LocationsSearchReuslts.propTypes = {
  searchResults: PropTypes.arrayOf(CurrentLocationInfoType).isRequired
};

export default LocationsSearchReuslts;
