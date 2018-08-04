import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="menu">
    <Link to="/" name="home">
      Home
    </Link>
    <Link to="/login" name="login">
      Login
    </Link>
    <Link to="/Sign-up" name="Sign-up">
      {' '}
      Sign up
    </Link>
    <Link to="/create-card" name="Create-Card">
      {' '}
      Create Card
    </Link>
  </div>
);
