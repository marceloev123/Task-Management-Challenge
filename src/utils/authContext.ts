import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql',
})
const authLink = setContext((_, {headers}) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoibmVyZGVyeSIsInByb2plY3RJZCI6ImEwOTlmYjA3LTZiMDUtNDc4Yy04N2JmLTc3YzczZTljZWNkZCIsImZ1bGxOYW1lIjoiTWFyY2VsbyBFcm5lc3RvIFZhbGRpdmlhIFZpemNhcnJhIiwiZW1haWwiOiJtYXJjZWxvdmFsZGl2aWFAcmF2bi5jbyIsImlhdCI6MTYzNzcwNjg1M30.iyg7KGckjxeK-VdPfrE1EQ67WXQTsqRLF9OfEWY4Vbs'

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
