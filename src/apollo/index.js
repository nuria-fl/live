import ApolloClient from 'apollo-boost'

export const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_API_URL
})
