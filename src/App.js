import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import CreateCard from './pages/Card/createCard';
import Nav from './components/nav';

const isAuthenticated = () => {
  const token = localStorage.getItem('x-token');
  const refreshToken = localStorage.getItem('x-refresh-token');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
);

export default () => (
  <BrowserRouter>
    <div className="app">
      <Nav isAuthenticated={isAuthenticated()} />
      <div className="app-container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/Sign-up" exact component={SignUp} />
          <PrivateRoute path="/create-card" exact component={CreateCard} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);
