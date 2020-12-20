import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {
  ApolloClient, ApolloProvider as Provider, HttpLink, InMemoryCache
} from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

ReactDOM.render(
  <Provider client={client}>
    <App />
  </Provider>,
  document.getElementById('root')
)