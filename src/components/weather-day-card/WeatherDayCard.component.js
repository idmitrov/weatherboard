import React, { Fragment } from 'react';
import propTypes from 'prop-types';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';

const WeatherDayCard = ({ date, dayName, description, temperature, imageUrl, useFarenheit }) => {
  return (
    <Card>
      <CardHeader title={
        <Fragment>
          <Typography variant="h5">{dayName}</Typography>

          <Typography variant="subtitle1">
            {date}
          </Typography>
        </Fragment>
      }>
      </CardHeader>

      <CardContent>
        <Grid container justify="center">
          <Grid item>
            <Typography variant="h4" component="p" align="center">
              {`${temperature} °${useFarenheit ? 'F' : 'C'}`}
            </Typography>

            <img src={imageUrl} alt="Weather icon" />

            <Typography variant="subtitle1" component="p" align="center">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

WeatherDayCard.propTypes = {
  temperature: propTypes.number.isRequired,
  date: propTypes.string.isRequired,
  dayName: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  imageUrl: propTypes.string.isRequired,
  useFarenheit: propTypes.bool
};

export default WeatherDayCard;
