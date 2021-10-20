import {
  CLEAR_SEARCH,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_SEARCH_IN_PROGRESS
} from '../actionTypes';

const initialState = {
  searchQuery: '',
  searchResults: [
    {
      id: 102643743,
      name: 'London',
      country: 'United Kingdom',
      timezone: 'Europe/London',
      adminArea: 'England',
      lon: -0.125532746,
      lat: 51.508415222
    },
    {
      id: 103458449,
      name: 'Londrina',
      country: 'Brazil',
      timezone: 'America/Sao_Paulo',
      adminArea: 'Estado do Parana',
      lon: -51.162776947,
      lat: -23.310277939
    },
    {
      id: 106058560,
      name: 'London',
      country: 'Canada',
      timezone: 'America/Toronto',
      adminArea: 'Ontario',
      lon: -81.233039856,
      lat: 42.983390808
    }
  ],
  isSearchInProgress: false
};

const locationsSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.searchQuery
      };
    case SET_SEARCH_IN_PROGRESS:
      return {
        ...state,
        isSearchInProgress: action.payload.isSearchInProgress
      };

    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload.searchResults
      };

    case CLEAR_SEARCH:
      return {
        searchQuery: '',
        searchResults: [],
        isSearchInProgress: false
      };

    default:
      return state;
  }
};

export default locationsSearchReducer;
