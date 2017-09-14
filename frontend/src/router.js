import React from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';

import { history } from './store';
import MainLayoutContainer from './layouts/container';
import Main from './modules/main/component';


export default (
  <Router history={history}>
    <MainLayoutContainer>
      <Route exact={true} path="/" component={Main} />
    </MainLayoutContainer>
  </Router>
);