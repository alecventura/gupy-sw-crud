import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import reducers
import notification from './notification/reducer';

const reducersCombined = combineReducers({
  routing: routerReducer,
  notification,
});

export default reducersCombined;
