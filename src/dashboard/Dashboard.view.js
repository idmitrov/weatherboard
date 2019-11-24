import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Trans } from 'react-i18next';
import { Typography } from '@material-ui/core';

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
		<div>
      <Typography>
        <Trans>dashboard.heading.text</Trans>
      </Typography>
    </div>
	);
};

export default Dashboard;
