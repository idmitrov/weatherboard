import React from 'react';

import { Switch, Route, Link } from 'react-router-dom';
import { Dashboard } from '@material-ui/icons';

import DashboardView from '../dashboard/Dashboard.view';

const NotFound = () => {
  return (
    <section>
      <h2>The page was not found</h2>

      <Link to="/" title="Back">Back</Link>
    </section>
  );
};

export const routes = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: '/',
    isPrivate: false,
    component: DashboardView,
    strict: true,
    exact: true,
    includeInDrawer: true,
    drawerIcon: Dashboard,
  },
  {
    key: "notfound",
    label: "Not found",
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
        routes.map(({ isPrivate, key, path, component, strict, exact }) => {
          return isPrivate ? (null) : (
            <Route
              key={key}
              path={path}
              component={component}
              strict={strict}
              exact={exact}
            />
          );
        })
      }
    </Switch>
  );
};

export default AppRoutes;
