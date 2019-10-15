import React from 'react'
import FlashMessage from 'react-native-flash-message'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

// Import utils
import { keys } from './src/utils/keys'

// Import navigation
import Navigation from './src/navigation/Navigation'

const client = new ApolloClient({
  uri: keys.urlApi
})

const Skiper = () => {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <FlashMessage position='top' />
    </ApolloProvider>
  )
}

export default Skiper
