import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import reducersCombined from './modules/combinedReducers';

// If you have a Redux extesion for Chrome.
const enhacers = (window.devToolsExtension ? window.devToolsExtension() : f => f);

const store = createStore(
  reducersCombined,
  compose(applyMiddleware(thunk), enhacers)
);

export const history = syncHistoryWithStore(
  createBrowserHistory(),
  store
);

export default store;