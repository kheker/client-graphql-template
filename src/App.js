import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Nav from './components/nav';
import Dashboard from './pages/User/dashboard';
import MainCard from './pages/Card/MainCard';

const isAuthenticated = () => {
  const token = localStorage.getItem('x-token');
  const refreshToken = localStorage.getItem('x-refresh-token');
  try {
    decode(token);
    const { exp } = decode(refreshToken);
    if (Date.now() / 1000 > exp) {
      return false;
    }
  } catch (err) {
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
export default class App extends React.Component {
  state = {
    isAuth: false,
  };

  componentDidMount() {
    this.setState({ isAuth: isAuthenticated() });
  }

  login = (ok, token, refreshToken) => {
    localStorage.setItem('x-token', token);
    localStorage.setItem('x-refresh-token', refreshToken);
    this.setState({ isAuth: ok });
  };

  logout = () => {
    localStorage.removeItem('x-token');
    localStorage.removeItem('x-refresh-token');
    this.setState({ isAuth: false });
    return <Redirect to={{ pathname: '/' }} />;
  };

  render() {
    const { isAuth } = this.state;
    return (
      <BrowserRouter>
        <div className="app">
          <Nav isAuthenticated={isAuth} logout={this.logout} />
          <div className="app-container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/login"
                exact
                render={props => <Login auth={this.login} {...props} />}
              />
              <Route
                path="/Sign-up"
                exact
                render={props => <SignUp auth={this.login} {...props} />}
              />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/card/:id" exact component={MainCard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
