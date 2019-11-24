import React from 'react';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

import Layout from './App.layout';
import Content from './App.routes';

import './App.scss';

const theme = createMuiTheme();

function App() {
  return (
    <div id="app">
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Layout>
          <Content />
        </Layout>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
