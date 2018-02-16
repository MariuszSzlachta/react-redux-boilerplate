import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import Header from '../components/Header';
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';
import NotFound from '../components/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>      
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;
