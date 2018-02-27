import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="wrapper">
      <div className="header__box">
        <h1 className="header__title">React Boilerplate</h1>
        <nav className="navigation">
          <ul className="navigation__list">
            <li className="navigation__item"><NavLink to="/" exact={true} activeClassName="navigation__link--active" className="navigation__link">Home</NavLink></li>
            <li className="navigation__item"><NavLink to="/counter" exact={true} activeClassName="navigation__link--active" className="navigation__link">Counter</NavLink></li>
            <li className="navigation__item"><NavLink to="/list" exact={true} activeClassName="navigation__link--active" className="navigation__link">List</NavLink></li>
            <li className="navigation__item"><NavLink to="/about" exact={true} activeClassName="navigation__link--active" className="navigation__link">About</NavLink></li>
          </ul>
        </nav>      
      </div>
    </div>
  </header>
);

export default Header;
