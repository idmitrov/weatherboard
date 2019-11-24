import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import Carousel from "../components/carousel/Carousel.component";
import { fetchForecastForFiveDays, setForecastForFiveDays } from './Dashboard.actions';
import WeatherDayCard from '../components/weather-day-card/WeatherDayCard.component';

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
  const { list } = useSelector((state) => state.dashboard.fiveDaysForecast);

  const uniqueDays = filterUniqueDays(list);

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
        list && list.length ? (
          <Carousel slidesToShow={4} slidesToScroll={4}>
            {
              uniqueDays.map((day, index) => {
                const dayWeather = day.weather[0];
                const date = new Date(day.dt * 1000);

                return (
                  <WeatherDayCard
                    key={index}
                    temperature={`${Math.round(day.main.temp)} °C`}
                    date={t('date.ddmmyy', { date: date.getDate(), month: date.getMonth(), year: date.getFullYear() })}
                    dayName={t(`week.dayName.${date.getDay()}`)}
                    description={t(`forecast.description.${dayWeather.main.toLowerCase()}`)}
                    image={`${process.env.PUBLIC_URL}/weather-icons/${dayWeather.icon}.png`}
                  />
                );
              })
            }
          </Carousel>
        ) : (null)
      }
    </div>
  );
};

export default Dashboard;
