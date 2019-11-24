import { dashboardActionTypes } from './Dashboard.actions';

const dashboardDefaults = {
  fiveDaysForecast: {
    list: [],
    city: {}
  }
};

const dashboardReducer = (state = dashboardDefaults, action = {}) => {
  switch (action.type) {
    case dashboardActionTypes.setForecastForFiveDays: {
      const newState = {
        fiveDaysForecast: action.payload
      };

      return newState;
    }
    default: return state;
  }
};

export default dashboardReducer;
