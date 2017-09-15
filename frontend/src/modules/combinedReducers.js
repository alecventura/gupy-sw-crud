import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import reducers
import notification from './notification/reducer';
import displayTable from './displayTable/reducer';

const reducersCombined = combineReducers({
  routing: routerReducer,
  notification,
  films: displayTable('films'),
  people: displayTable('people'),
  planets: displayTable('planets'),
  species: displayTable('species'),
  starships: displayTable('starships'),
  vehicles: displayTable('vehicles'),
});

export default reducersCombined;
