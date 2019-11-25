import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => {
  return {
    overlay: {
      position: 'absolute',
      top: '100%',
      width: '100%',
      height: '100%',
      opacity: 0,
      visibility: 'hidden',
      zIndex: 10,
      transition: 'all .5s 0s',
      backgroundColor: 'rgba(40, 80, 150, .6)',
      padding: 15,
      color: '#fff',
    },
    overlayVisible: {
      top: 0,
      opacity: 1,
      visibility: 'visible',
    },
    card: {
      position: 'relative',
    },
    moreButton: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      zIndex: 9999
    }
  };
});

const WeatherDayCard = ({ date, description, temperature, minTemperature, maxTemperature, iconName, useImperial, humidity }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const temUnitSymbol = useImperial ? '°F' : '°C';
  const dateFormatted = t('date.ddmmyy', { date: date.getDate(), month: date.getMonth(), year: date.getFullYear() });
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  return (
    <Card className={classes.card}>
      <CardHeader title={
        <React.Fragment>
          <Typography variant="h5">{t(`week.dayName.${date.getDay()}`)}</Typography>

          <Typography variant="subtitle1">
            {dateFormatted}
          </Typography>
        </React.Fragment>
      }>
      </CardHeader>

      <CardContent>
        <Grid container justify="center">
          <Grid item>
            <Typography variant="h4" component="p" align="center">
              {`${Math.round(temperature)} ${temUnitSymbol}`}
            </Typography>

            <img src={`${process.env.PUBLIC_URL}/weather-icons/${iconName}.png`} alt="Weather icon" />

            <Typography variant="subtitle1" component="p" align="center">
              {t(`forecast.description.${description.toLowerCase()}`)}
            </Typography>
          </Grid>

          <IconButton className={classes.moreButton} onClick={() => setIsOverlayVisible(!isOverlayVisible)}>
            <Info />
          </IconButton>
        </Grid>
      </CardContent>

      <div className={clsx(classes.overlay, isOverlayVisible && classes.overlayVisible)}>
        <Typography>{`${t('forecast.min')}: ${Math.round(minTemperature)}${temUnitSymbol}`}</Typography>
        <Typography>{`${t('forecast.max')}: ${Math.round(maxTemperature)}${temUnitSymbol}`}</Typography>
        <Typography>{`${t('forecast.humidity')}: ${Math.round(humidity)} %`}</Typography>
      </div>
    </Card>
  );
};

const descriptionTypes = ['Clouds', 'Rain', 'Clear', 'Snow', 'Drizzle', 'Thunderstorm', 'Mist', 'Fog'];
const iconTypes = ['01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n', '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'];

WeatherDayCard.propTypes = {
  temperature: propTypes.number.isRequired,
  minTemperature: propTypes.number.isRequired,
  maxTemperature: propTypes.number.isRequired,
  humidity: propTypes.number.isRequired,
  date: propTypes.instanceOf(Date).isRequired,
  description: propTypes.oneOf([...descriptionTypes, ...descriptionTypes.map((t) => t.toLocaleLowerCase())]).isRequired,
  iconName: propTypes.oneOf(iconTypes).isRequired,
  useImperial: propTypes.bool
};

export default WeatherDayCard;
