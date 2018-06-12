import React from 'react';
import ReactDOM from 'react-dom';
// Root component
import App from './App';
// Service Worker
import registerServiceWorker from './registerServiceWorker';
// Global CSS styles
import './styles/main.scss';

// Hot Module Replacement
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line
    ReactDOM.render(<NextApp />, document.getElementById('app'));
  });
}

ReactDOM.render(<App />, document.getElementById('app'));

registerServiceWorker();
