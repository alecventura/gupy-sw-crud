import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import MainLayoutContainer from './layouts/container';

render(
  <Provider store={store}>
    <MainLayoutContainer />
  </Provider>,
  document.getElementById('app'),
);
