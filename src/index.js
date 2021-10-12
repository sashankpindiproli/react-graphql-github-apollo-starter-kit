import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error'

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './style.css';

const cache = new InMemoryCache();
const httpLink = new HttpLink( {
  uri: process.env.REACT_APP_GITHUB_BASE_URL,
  headers: { authorization: `Bearer ${ process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN }`, },
} );

const errorLink = onError( ( { graphQLErrors, networkError, operation, forward } ) => { 
  console.log( graphQLErrors );
  if ( graphQLErrors ) {
    // do something with graphql error
    for (let error of graphQLErrors) { 
      switch (error.extensions.code) {
        case 'UNAUTHENTICATED':
          // do something with graphql error when it is unauthenticated
      }
    }
  }
  else if (networkError) { 
    // do something with network error
  }
});

const link = ApolloLink.from( [ errorLink, httpLink ] );

const apolloClient = new ApolloClient( { link, cache } );

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
