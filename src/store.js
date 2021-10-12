import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import serverApi from './reducers/serverApiReducer';
import theme from './reducers/themeReducer';

import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
  serverApi,
  theme,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
