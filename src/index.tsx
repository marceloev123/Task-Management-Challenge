import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

import {setContext} from '@apollo/client/link/context'

import './fonts/SF PRO DISPLAY/fonts.css'
import App from './App'
// import {AuthProvider} from './context/Authcontext'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_URI,
})
const authLink = setContext((_, {headers}) => {
  const token = process.env.REACT_APP_TOKEN

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

//Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
