import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Grow } from '@material-ui/core';

import Carousel from "../components/carousel/Carousel.component";
import WeatherDayCard from '../components/weather-day-card/WeatherDayCard.component';
import WeatherCityBar from '../components/weather-city-bar/WeatherCityBar.component';
import WeatherWindMeter from '../components/weather-wind-meter/WeatherWindMeter.component';

import { fetchForecastForFiveDays, setForecastForFiveDays } from './Dashboard.actions';

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
  const { list, city } = useSelector((state) => state.dashboard.fiveDaysForecast);

  const uniqueDays = filterUniqueDays(list);
  const uniqueDaysWind = uniqueDays.map((day) => day.wind);

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
              <Grow in={true} timeout={1000}>
                <WeatherCityBar
                  name={city.name}
                  country={city.country}
                  sunrise={new Date(city.sunrise * 1000)}
                  sunset={new Date(city.sunset * 1000)}
                />
              </Grow>
            </Grid>

            <Grid item xs={12}>
              <Grow in={true} timeout={1000}>
                <Carousel slidesToShow={5} slidesToScroll={5}>
                  {
                    uniqueDays.map((currentDay, index) => {
                      const currentDayWeather = currentDay.weather[0];
                      const currentDayDate = new Date(currentDay.dt * 1000);

                      return (
                        <WeatherDayCard
                          key={index}
                          temperature={currentDay.main.temp}
                          minTemperature={currentDay.main.temp_min}
                          maxTemperature={currentDay.main.temp_max}
                          humidity={currentDay.main.humidity}
                          pressure={currentDay.main.pressure}
                          date={currentDayDate}
                          description={currentDayWeather.main}
                          iconName={currentDayWeather.icon}>
                        </WeatherDayCard>
                      );
                    })
                  }
                </Carousel>
              </Grow>
            </Grid>

            <Grid item xs={12} md={6}>
              <WeatherWindMeter
                outerRadiusPercentage={70}
                data={uniqueDaysWind}
              />
            </Grid>
          </Grid>
        ) : (null)}
    </div>
  );
};

export default Dashboard;
