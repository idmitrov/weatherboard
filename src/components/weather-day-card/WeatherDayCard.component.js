import React, { Fragment } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';

const WeatherDayCard = ({ date, dayName, description, temperature, image }) => {
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
              {temperature}
            </Typography>

            <img src={image} alt="Weather icon" />

            <Typography variant="subtitle1" component="p" align="center">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherDayCard;
