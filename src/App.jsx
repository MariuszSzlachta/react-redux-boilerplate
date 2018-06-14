import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Aux from 'components/Aux/Aux';
import DynamicImport from 'components/DynamicImport/DynamicImport';
import store from 'store/configureStore';

const App = () => {
  const Counter = props => (
    <DynamicImport load={() => import(/* webpackChunkName: "counter" */ 'containers/Counter/Counter')}>
      {Component => (Component === null
        ? null
        : <Component {...props} />)}
    </DynamicImport>
  );

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Aux>
          <h1>React-Redux Boilerplate</h1>
          <Link href="/counter" to="/counter">Counter</Link>
          <Switch>
            <Route path="/counter" exact component={() => Counter()} />
          </Switch>
        </Aux>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

