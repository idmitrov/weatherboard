import React from 'react';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

import Layout from './App.layout';
import Content from './App.routes';

import './App.scss';

const theme = createMuiTheme();

function App({ name, version, copyright }) {
  return (
    <div id="app" data-app-version={version} data-app-copyright={copyright}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Layout heading={name}>
          <Content />
        </Layout>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
