import React from 'react';

import Layout from './App.layout';
import Content from './App.routes';

import './App.scss';

function App() {
  return (
    <div id="app">
      <Layout>
        <Content />
      </Layout>
    </div>
  );
}

export default App;
