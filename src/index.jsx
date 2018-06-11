import React from 'react';
import ReactDOM from 'react-dom';
// Root component
import App from './App';
// Service Worker
import registerServiceWorker from './registerServiceWorker';
// Global CSS styles
import './styles/main.scss';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
