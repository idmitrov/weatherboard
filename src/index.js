import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import 'typeface-roboto';
import './index.scss';

import App from './app/App';
import history from './shared/history.utils';
import store from './app/App.store';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
