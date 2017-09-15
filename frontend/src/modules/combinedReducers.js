import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import reducers
import notification from './notification/reducer';
import displayTable from './displayTable/reducer';

const reducersCombined = combineReducers({
  routing: routerReducer,
  notification,
  films: displayTable,
  people: displayTable,
  planets: displayTable,
  species: displayTable,
  starships: displayTable,
  vehicles: displayTable,
});

export default reducersCombined;
