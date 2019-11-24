import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchForecastForFiveDays, setForecastForFiveDays } from './Dashboard.actions';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchForecastData = async() => {
      const forecastData = await dispatch(fetchForecastForFiveDays());

      dispatch(setForecastForFiveDays(forecastData));
    };

    fetchForecastData();
  }, [dispatch]);

	return (
		<div>Dashboard</div>
	);
};

export default Dashboard;
