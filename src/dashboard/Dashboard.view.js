import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import Carousel from "../components/carousel/Carousel.component";
import { fetchForecastForFiveDays, setForecastForFiveDays } from './Dashboard.actions';
import WeatherDayCard from '../components/weather-day-card/WeatherDayCard.component';
import WeatherCityBar from '../components/weather-city-bar/WeatherCityBar.component';
import WeatherWindMeter from '../components/weather-wind-meter/WeatherWindMeter.component';
import { Grid } from '@material-ui/core';

const filterUniqueDays = (days) => {
  const uniqueDays = days.reduce((daysMerge, day) => {
    const date = day.dt_txt.split(' ')[0];
    const isExistingDay = daysMerge.find((d) => d.dt_txt.includes(date));

    if (!isExistingDay) {
      daysMerge.push(day);
    }

    return daysMerge;
  }, []);

  return uniqueDays;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { list, city } = useSelector((state) => state.dashboard.fiveDaysForecast);

  const uniqueDays = filterUniqueDays(list);
  const uniqueDaysWind = uniqueDays.map((day) => day.wind)
    .sort((a, b) => a.speed > b.speed ? 1 : a.speed < b.speed ? -1 : 0);

  useEffect(() => {
    const fetchForecastData = async () => {
      const forecastData = await dispatch(fetchForecastForFiveDays());

      dispatch(setForecastForFiveDays(forecastData));
    };

    fetchForecastData();
  }, [dispatch]);

  return (
    <div>
      {
        city && city.id ? (
          <Grid container>
            <Grid item xs={12}>
              <WeatherCityBar
                name={city.name}
                country={city.country}
                sunrise={new Date(city.sunrise * 1000)}
                sunset={new Date(city.sunset * 1000)}
              />
            </Grid>

            <Grid item xs={12}>

              <Carousel slidesToShow={4} slidesToScroll={4}>
                {
                  uniqueDays.map((currentDay, index) => {
                    const currentDayWeather = currentDay.weather[0];
                    const currentDayDate = new Date(currentDay.dt * 1000);

                    const date = t('date.ddmmyy', { date: currentDayDate.getDate(), month: currentDayDate.getMonth(), year: currentDayDate.getFullYear() });
                    const day = t(`week.dayName.${currentDayDate.getDay()}`);
                    const description = t(`forecast.description.${currentDayWeather.main.toLowerCase()}`);
                    const imageUrl = `${process.env.PUBLIC_URL}/weather-icons/${currentDayWeather.icon}.png`;
                    const temperature = Math.round(currentDay.main.temp);

                    return (
                      <WeatherDayCard
                        key={index}
                        temperature={temperature}
                        date={date}
                        dayName={day}
                        description={description}
                        imageUrl={imageUrl}
                      />
                    );
                  })
                }
              </Carousel>
            </Grid>

            <Grid item xs={12} md={6}>
              <WeatherWindMeter data={uniqueDaysWind} />
            </Grid>
          </Grid>
        ) : (null)}
    </div>
  );
};

export default Dashboard;
