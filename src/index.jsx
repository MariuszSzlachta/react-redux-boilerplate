import React from 'react';
import ReactDOM from 'react-dom';

// Root component
import App from 'App';

// Global CSS styles
import './styles/main.scss';

// Hot Module Replacement
if (module.hot) {
  module.hot.accept('./App', () => {
    // next-line
    const NextApp = require('./App').default; // eslint-disable-line
    ReactDOM.render(<NextApp />, document.getElementById('app'));
  });
}

ReactDOM.render(<App />, document.getElementById('app'));
