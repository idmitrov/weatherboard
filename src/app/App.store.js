import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import dashboardReducer from '../dashboard/Dashboard.reducer';

const rootReducer = combineReducers({
  dashboard: dashboardReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
);

export default store;
