import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';

import { useTranslation } from 'react-i18next';

import Carousel from "../components/carousel/Carousel.component";
import { fetchForecastForFiveDays, setForecastForFiveDays } from './Dashboard.actions';

const renderWeek = (week, t) => {
  const uniqueDays = week.reduce((days, day) => {
    const date = day.dt_txt.split(' ')[0];
    const isExistingDay = days.find((d) => d.dt_txt.includes(date));

    if (!isExistingDay) {
      days.push(day);
    }

    return days;
  }, []);

  return (
    <Grid item xs={12} md={12}>
      <Carousel slidesToShow={4} slidesToScroll={4}>
        {
          uniqueDays.map((day, index) => {
            const dayWeather = day.weather[0];
            const date = new Date(day.dt * 1000);

            return (
              <div key={index}>
                <Card>
                  <CardHeader title={
                    <Fragment>
                      <Typography variant="h5">{t(`week.dayName.${date.getDay()}`)}</Typography>

                      <Typography variant="subtitle1">
                        {t('date.ddmmyy', { date: date.getDate(), month: date.getMonth(), year: date.getFullYear() })}
                      </Typography>
                    </Fragment>
                  }>
                  </CardHeader>

                  <CardContent>
                    <Grid container justify="center">
                      <Grid item>
                        {/* IMAGE */}
                        <Typography variant="h4" component="p" align="center">
                          {`${Math.round(day.main.temp)} °C`}
                        </Typography>

                        <img src={`${process.env.PUBLIC_URL}/weather-icons/${dayWeather.icon}.png`} alt="Weather icon" />

                        {/* DESCRIPTION */}
                        <Typography variant="subtitle1" component="p" align="center">
                          {t(`forecast.description.${dayWeather.main.toLowerCase()}`)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            );
          })
        }
      </Carousel>
    </Grid>
  );
}

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
        {city && city.id && renderWeek(list, t)}
      </Grid>
    </div>
  );
};

export default Dashboard;
