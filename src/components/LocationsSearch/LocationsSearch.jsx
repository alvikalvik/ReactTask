import './LocationsSearch.css';

function LocationsSearch(props) {
  return (
    <div className="locations-search">
      <h2 className="locations-search__title">Search for location</h2>
      <input type="text" className="locations-search__input" placeholder="search query" />
      <div className="locations-search__input-description">at least 3 characters</div>
    </div>
  );
}

export default LocationsSearch;
