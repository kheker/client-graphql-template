import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../css/img/'

const userLinks = (
  <Fragment>
    <Link className="menu-item" to="/create-card" name="Create-Card">
      {' '}
      Create Card
    </Link>
    <Link className="menu-item" to="/loguot" name="logout">
      {' '}
      Logout
    </Link>
    <Link className="menu-item" to="/profile" name="profile">
      {' '}
      Profile
    </Link>
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
export default ({ isAuthenticated }) => (
  <div className="menu">
    <div className="menu-container">
      <Link className="logo" to="/">
        Logo
      </Link>
      <div className="menu-items">
        {isAuthenticated ? userLinks : guestLinks}
      </div>
    </div>
  </div>
);
