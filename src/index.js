import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'typeface-roboto';

import './css/main.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new createHttpLink({
  uri: '/graphql',
});

const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('x-token'),
    'x-refresh-token': localStorage.getItem('x-refresh-token'),
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();
  if (headers) {
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');

    if (token) {
      localStorage.setItem('x-token', token);
    }
    if (refreshToken) {
      localStorage.setItem('x-refresh-token', refreshToken);
    }
  }
  return forward(operation);
});

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
ReactDOM.render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
