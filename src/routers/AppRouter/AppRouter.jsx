import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Header, HomePage, CounterPage, ListPage, AboutPage, NotFound } from 'Components';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/list" component={ListPage} />
          <Route path="/counter" component={CounterPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;
