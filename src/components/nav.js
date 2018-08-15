import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../css/img/'

const userLinks = logout => (
  <Fragment>
    <Link className="menu-item" to="/dashboard" name="dashboard">
      {' '}
      Dashboard
    </Link>
    <Link className="menu-item" to="/profile" name="profile">
      {' '}
      Profile
    </Link>
    <a className="menu-item" onClick={logout}>
      {' '}
      Logout
    </a>
  </Fragment>
);

const guestLinks = (
  <Fragment>
    <Link className="menu-item" to="/login" name="login">
      Login
    </Link>
    <Link className="menu-item" to="/Sign-up" name="Sign-up">
      {' '}
      Sign up
    </Link>
  </Fragment>
);
export default ({ isAuthenticated, logout }) => (
  <div className="menu">
    <div className="menu-container">
      <Link className="logo" to="/">
        Logo
      </Link>
      <div className="menu-items">
        {isAuthenticated ? userLinks(logout) : guestLinks}
      </div>
    </div>
  </div>
);
