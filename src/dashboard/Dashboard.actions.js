import dashboardEndpoints from './Dashboard.endpoints';

export const dashboardActionTypes = {
  fetchForecastForFiveDays: 'FORECAST_FIVE_DAYS_FETCH',
  setForecastForFiveDays: 'FORECAST_FIVE_DAYS_SET'
};

/**
 * Dispatch API action which API middleware to handle
 * and do API request
 * @name fetchForecastForFiveDays
 */
export const fetchForecastForFiveDays = () => {
  const action = {
    type: dashboardActionTypes.fetchForecastForFiveDays,
    api: {
      endpoint: dashboardEndpoints.getForecastForFiveDays.endpoint,
      method: dashboardEndpoints.getForecastForFiveDays.method
    }
  };

  return action;
};

/**
 * Dispatch action to set the recived forecast API data
 * @name fetchForecastForFiveDays
 * @param {Object} data
 */
export const setForecastForFiveDays = (data) => {
  const { list, city } = data;

  const action = {
    type: dashboardActionTypes.setForecastForFiveDays,
    payload: { list, city }
  };

  return action;
}
