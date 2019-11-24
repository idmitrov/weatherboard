import dashboardEndpoints from './Dashboard.endpoints';

export const dashboardActionTypes = {
  fetchForecastForFiveDays: 'FORECAST_FIVE_DAYS_FETCH'
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
