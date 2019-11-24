import { dashboardActionTypes } from './Dashboard.actions';

const dashboardDefaults = {
  fiveDaysForecast: null
};

const dashboardReducer = (state = dashboardDefaults, action = {}) => {
  switch (action.type) {
    case dashboardActionTypes.fetchForecastForFiveDays: {
      const newState = {
        fiveDaysForecast: action.payload
      };

      return newState;
    }
    default: return state;
  }
};

export default dashboardReducer;
