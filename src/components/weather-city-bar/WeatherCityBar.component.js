import React from 'react';
import PropTypes from 'prop-types';

import { Trans } from 'react-i18next';
import { Card, Typography, AppBar, Toolbar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => {
  return {
    barRightCol: {
      paddingRight: 10,
      '&:last-of-type': {
        paddingRight: 0,
      },
    }
  };
})

const WeatherCityBar = ({ name, country, sunrise, sunset, ...rest }) => {
  const classes = useStyles();

  return (
    <Card {...rest}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">{name}, {country}</Typography>
            </Grid>

            <Grid>
              <Grid container alignItems="center">
                <Grid item className={classes.barRightCol}>
                  <Typography variant="h6">
                    <Trans values={{ hours: sunrise.getHours(), minutes: sunrise.getMinutes() }}>forecast.sunrise</Trans>
                  </Typography>
                </Grid>

                <Grid item className={classes.barRightCol}>
                  <Typography variant="h6">
                    <Trans values={{ hours: sunset.getHours(), minutes: sunset.getMinutes() }}>forecast.sunset</Trans>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Card>
  );
};

WeatherCityBar.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  sunrise: PropTypes.instanceOf(Date),
  sunset: PropTypes.instanceOf(Date)
};

export default WeatherCityBar;
