import dashboardEndpoints from './Dashboard.endpoints';

export const dashboardActionTypes = {
  fetchForecastForFiveDays: 'FORECAST_FIVE_DAYS_FETCH',
  setForecastForFiveDays: 'FORECAST_FIVE_DAYS_SET'
};

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

export const setForecastForFiveDays = (data) => {
  const { list, city } = data;

  const action = {
    type: dashboardActionTypes.setForecastForFiveDays,
    payload: { list, city }
  };

  return action;
}
