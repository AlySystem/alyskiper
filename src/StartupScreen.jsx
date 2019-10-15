import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import decodeJwt from 'jwt-decode'
import moment from 'moment'

// Import components
import Background from './components/background/Background'
import Picture from './components/picture/Picture'
import Title from './components/title/Title'
import Loader from './components/loader/Loader'

// Import theme
import { Theme } from './constants/Theme'

// Import utils
import { keys } from './utils/keys'
import { getAsyncStorage } from './utils/AsyncStorage'

const StartupScreen = props => {
  const { navigate } = props.navigation
  const [title] = useState(props.navigation.getParam('message', ' '))

  useEffect(() => {
    const trySignIn = async () => {
      const userData = await getAsyncStorage(keys.asyncStorageKey)

      if (!userData) {
        navigate('Welcome')
        return
      }
      const userParse = JSON.parse(userData)
      const payloadToken = decodeJwt(userParse.userToken)
      if (payloadToken.exp < moment().unix()) {
        navigate('SignIn')
        return
      }

      navigate('Home')
    }
    trySignIn()
  }, [])

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.container}>
          <Picture />
          <View style={{ paddingVertical: 5 }} />
          <Loader />
          {title && (
            <Title
              title={title}
              styles={styles.title}
            />
          )}
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold',
    textAlign: 'center'
  }
})

export default StartupScreen
