// React Library
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Styles
import './styles/main.scss';

// Main Router
import AppRouter from './routers/AppRouter';

// Store
import configureStore from './store/configureStore';

// Actions
import { incrementCounter } from './actions/counter';


const store = configureStore();


const jsx =  (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render( jsx, document.getElementById('app'));
