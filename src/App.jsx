import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Aux from 'components/HOC/Aux/Aux';
import Counter from 'containers/Counter/Counter';
import store from 'store/configureStore';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Aux>
        <h1>React-Redux Boilerplate</h1>
        <Link href="/counter" to="/counter">Counter</Link>
        <Switch>
          <Route exact path="/counter" component={Counter} />
        </Switch>
      </Aux>
    </BrowserRouter>
  </Provider>
);

export default App;

