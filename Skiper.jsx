import React, { useEffect, useState } from 'react'
import FlashMessage from 'react-native-flash-message'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import NetInfo from '@react-native-community/netinfo'

// Import utils
import { keys } from './src/utils/keys'
import { getAsyncStorage } from './src/utils/AsyncStorage'

// Import store
import store from './src/store/store'

// Import navigation
import Navigation from './src/navigation/Navigation'
import OfflineScreen from './src/screens/Offline/OfflineScreen'

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
