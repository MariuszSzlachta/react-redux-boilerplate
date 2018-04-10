// React Library and Redux Provider
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Styles
import 'styles/main.scss';

// Router
import AppRouter from 'Routers';

// Store
import configureStore from 'store/configureStore';

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
