import React from 'react';
import { Aux, DynamicImport } from 'Components';
// import { Counter } from 'Containers';

// React Router
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
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
          <Link to="/xD">xD</Link>
          <Switch>
            <Route path="/xD" exact component={() => Counter({ foo: 2 })} />
          </Switch>
          {/* <Counter /> */}
        </Aux>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

