import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';

const WeatherDayCard = ({ date, description, temperature, iconName, useImperial }) => {
  const { t } = useTranslation();
  const dateFormatted = t('date.ddmmyy', { date: date.getDate(), month: date.getMonth(), year: date.getFullYear() });

  return (
    <Card>
      <CardHeader title={
        <Fragment>
          <Typography variant="h5">{t(`week.dayName.${date.getDay()}`)}</Typography>

          <Typography variant="subtitle1">
            {dateFormatted}
          </Typography>
        </Fragment>
      }>
      </CardHeader>

      <CardContent>
        <Grid container justify="center">
          <Grid item>
            <Typography variant="h4" component="p" align="center">
              {`${Math.round(temperature)} °${useImperial ? 'F' : 'C'}`}
            </Typography>

            <img src={`${process.env.PUBLIC_URL}/weather-icons/${iconName}.png`} alt="Weather icon" />

            <Typography variant="subtitle1" component="p" align="center">
              {t(`forecast.description.${description.toLowerCase()}`)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const descriptionTypes = ['Clouds', 'Rain', 'Clear', 'Snow', 'Drizzle', 'Thunderstorm', 'Mist', 'Fog'];
const iconTypes = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];

WeatherDayCard.propTypes = {
  temperature: propTypes.number.isRequired,
  date: propTypes.instanceOf(Date).isRequired,
  description: propTypes.oneOf([...descriptionTypes, ...descriptionTypes.map((t) => t.toLocaleLowerCase())]).isRequired,
  iconName: propTypes.oneOf(iconTypes).isRequired,
  useImperial: propTypes.bool
};

export default WeatherDayCard;
