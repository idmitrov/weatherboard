import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';

import { fetchForecastForFiveDays, setForecastForFiveDays } from './Dashboard.actions';
import { useTranslation } from 'react-i18next';

const renderToday = (today, city, t) => {
  const sunrise = new Date(city.sunrise * 1000);
  const sunset = new Date(city.sunset * 1000);
  const todayWeather = today.weather[0];

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader title={t('forecast.today')}></CardHeader>

        <CardContent>
          <Grid container justify="center">
            <Grid item>
              {/* IMAGE */}
              <img src={`${process.env.PUBLIC_URL}/weather-icons/${todayWeather.icon}.png`} alt="Weather icon" />

              {/* DESCRIPTION */}
              <Typography variant="subtitle1" component="p" align="center">
                {t(`forecast.description.${todayWeather.main}`)}
              </Typography>
            </Grid>
          </Grid>

          {/* LOCATION */}
          <Typography>
            {city.country}, {city.name}
          </Typography>

          {/* META */}
          <Typography>
            {t('forecast.sunrise', { hours: sunrise.getHours(), minutes: sunrise.getMinutes() })}
          </Typography>

          <Typography>
            {t('forecast.sunset', { hours: sunset.getHours(), minutes: sunset.getMinutes() })}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { city, list } = useSelector((state) => state.dashboard.fiveDaysForecast);

  useEffect(() => {
    const fetchForecastData = async () => {
      const forecastData = await dispatch(fetchForecastForFiveDays());
      dispatch(setForecastForFiveDays(forecastData));
    };

    fetchForecastData();
  }, [dispatch]);

  return (
    <div>
      <Grid container spacing={4}>
        {city && city.id && renderToday(list[0], city, t)}

        <Grid item xs={12} sm={6} md={4}>
          <Card>TODO</Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>TODO</Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
