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
        ) : (null)
      }
    </div>
  );
};

export default Dashboard;
