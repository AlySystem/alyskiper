import React, { useEffect, useState } from 'react'
import FlashMessage from 'react-native-flash-message'
import { ApolloClient, split, HttpLink } from 'apollo-boost'
import { Provider } from 'react-redux'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'

import NetInfo from '@react-native-community/netinfo'

// Import utils
import { keys } from './src/utils/keys'
import { getAsyncStorage } from './src/utils/AsyncStorage'

// Import store
import store from './src/store/store'

// Import navigation
import Navigation from './src/navigation/Navigation'
import OfflineScreen from './src/screens/Offline/OfflineScreen'

import { configure } from './src/hooks/usePushNotification'

const httpLink = new HttpLink({
  uri: keys.urlApi
})

const wsLink = new WebSocketLink({
  uri: keys.urlApi,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authLink = setContext(async (_, { headers }) => {
  const userData = await getAsyncStorage(keys.asyncStorageKey)
  if (userData) {
    const userToken = JSON.parse(userData).userToken
    return {
      headers: {
        ...headers,
        Authorization: userToken ? `Bearer ${userToken}` : ''
      }
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  onError: error => {
    const { networkError } = error
    console.log(networkError)
  }
})

const Skiper = () => {
  configure()
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) setIsConnected(false)
    })
    return () => {
      unsubscribe()
    }
  }, [setIsConnected])

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {isConnected ? (
          <>
            <Navigation />
            <FlashMessage position='top' />
          </>
        ) : (
          <OfflineScreen />
        )}
      </ApolloProvider>
    </Provider>
  )
}

export default Skiper
