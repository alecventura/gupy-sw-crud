import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import reducers
// import main from './main/reducer';

const reducersCombined = combineReducers({
//   main,
    field: () => ({ value: 'Opa' }),
    routing: routerReducer
});

export default reducersCombined;