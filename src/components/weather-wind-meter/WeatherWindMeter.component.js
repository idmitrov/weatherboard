import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip
} from 'recharts';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => {
  return {
    tooltipWrapper: {
      padding: 5,
      backgroundColor: 'rgba(255, 255, 255, .8)',
      boxShadow: '0 0 2px rgba(0, 0, 0, .4)'
    }
  };
});

const WeatherWindMeter = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  data.sort((a, b) => a.speed > b.speed ? 1 : a.speed < b.speed ? -1 : 0);

  return (
    <Fragment>
      <Typography variant="h5" align="center">{t('forecast.windSpeed')}</Typography>

      <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
        <PieChart>
          <Pie
            dataKey="speed"
            startAngle={180}
            endAngle={0}
            data={data}
            outerRadius="80%"
            label
            fill="#8884d8"
          />

          <Tooltip content={({ payload }) => {
            if (payload && payload[0]) {
              const data = payload[0];

              return (
                <div className={classes.tooltipWrapper}>
                  <Typography variant="h6">
                    {t(`week.dayName.${data.name}`)}
                  </Typography>

                  <Typography>
                    {`${t('forecast.windSpeed')} ${data.payload.speed} m/s`}
                  </Typography>
                </div>
              );
            }

            return null;
          }} />
        </PieChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

WeatherWindMeter.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      deg: PropTypes.number,
      speed: PropTypes.number,
    })
  )
};

export default WeatherWindMeter;
