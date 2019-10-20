import React from 'react'
import FlashMessage from 'react-native-flash-message'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'

// Import utils
import { keys } from './src/utils/keys'
import { getAsyncStorage } from './src/utils/AsyncStorage'

// Import store
import store from './src/store/store'

// Import navigation
import Navigation from './src/navigation/Navigation'

const client = new ApolloClient({
  uri: keys.urlApi,
  request: async operation => {
    const userData = await getAsyncStorage(keys.asyncStorageKey)
    if (userData) {
      const userToken = JSON.parse(userData).userToken
      operation.setContext({
        headers: {
          Authorization: userToken ? `Bearer ${userToken}` : ''
        }
      })
    }
  }
})

const Skiper = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Navigation />
        <FlashMessage position='top' />
      </ApolloProvider>
    </Provider>
  )
}

export default Skiper
