import React from 'react';

import { Switch, Route, Link } from 'react-router-dom';
import DashboardView from '../dashboard/Dashboard.view';

const NotFound = () => {
  return (
    <section>
      <h2>The page was not found</h2>

      <Link to="/" title="Back">Back</Link>
    </section>
  );
};

const routes = [
  {
    key: "dashboard",
    path: '/',
    isPrivate: false,
    component: DashboardView,
    strict: true,
    exact: true,
  },
  {
    key: "notfound",
    path: '*',
    isPrivate: false,
    component: NotFound,
    strict: true,
    exact: true,
  }
];

const AppRoutes = () => {
  return (
    <Switch>
      {
        routes.map(({ isPrivate, ...route }) => {
          return isPrivate ? (null) : (
            <Route {...route} />
          );
        })
      }
    </Switch>
  );
};

export default AppRoutes;
