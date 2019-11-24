import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../shared/api.middleware';


import appdReducer from '../app/App.reducer';
import dashboardReducer from '../dashboard/Dashboard.reducer';

const rootReducer = combineReducers({
  app: appdReducer,
  dashboard: dashboardReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, apiMiddleware)
  )
);

export default store;
