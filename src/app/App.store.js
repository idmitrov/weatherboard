import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  dashboard: () => { return null }
  // TODO: Add reducers
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    // TODO: Add middlewares
  )
);

export default store;
