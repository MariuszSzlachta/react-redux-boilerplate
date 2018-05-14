import React from 'react';
import { Aux } from 'Components';
import { Counter } from 'Containers';

// React Router
import { BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from 'store/configureStore';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Aux>
        <h1>React-Redux Boilerplate</h1>
        <Counter />
      </Aux>
    </BrowserRouter>
  </Provider>
);

export default App;

