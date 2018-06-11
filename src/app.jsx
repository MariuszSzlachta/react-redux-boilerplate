import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Aux, DynamicImport } from 'components';
import store from './store/configureStore';


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
          <h1>React-Redux Boilerplate!</h1>
          <Link href="/xD" to="/xD">xD</Link>
          <Switch>
            <Route path="/xD" exact component={() => Counter({ foo: 2 })} />
          </Switch>
        </Aux>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

