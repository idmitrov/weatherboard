import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import './index.scss';

import App from './app/App';
import history from './utils/history.utils';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
