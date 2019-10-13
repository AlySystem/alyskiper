import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

// Import navigation
import Navigation from './src/navigation/Navigation'

const client = new ApolloClient({
  uri: 'https://backend-alysystem-v2.herokuapp.com/graphql'
})

const Skiper = () => {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  )
}

export default Skiper
