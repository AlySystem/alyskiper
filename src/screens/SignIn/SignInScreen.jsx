import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { showMessage } from 'react-native-flash-message'
import { useMutation } from '@apollo/react-hooks'

// Import mutations
import { SIGNIN } from '../../graphql/mutations/Mutations'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import Title from '../../components/title/Title'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'

// Import theme
import { Theme } from '../../constants/Theme'

// Import utils
import { setAsyncStorage } from '../../utils/AsyncStorage'
import { keys } from '../../utils/keys'
import { decodeJwt } from '../../utils/Token'

const SignInScreen = props => {
  const { navigate } = props.navigation
  const [SignIn, { loading }] = useMutation(SIGNIN)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnSubmit = async () => {
    const result = await SignIn({ variables: { input: { email, password } } })

    const { error } = result.data.signin
    if (error !== null) {
      showMessage({
        message: 'Error',
        description: error.message,
        backgroundColor: 'red',
        color: '#fff',
        icon: 'danger',
        titleStyle: {
          fontFamily: 'Lato-Bold'
        },
        textStyle: {
          fontFamily: 'Lato-Regular'
        }
      })
      return
    }
    const { data } = result.data.signin
    if (data !== null) {
      const userToken = decodeJwt(data.token)
      const userId = userToken.sub
      const payload = {
        auth: true,
        userToken: data.token,
        userId: userId,
        firstName: data.firstname,
        lastName: data.lastname,
        username: data.username,
        email: data.email,
        phoneNumber: data.phone_number
      }
      setAsyncStorage(keys.asyncStorageKey, payload)
      navigate('Home')
    }
  }

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.layout}>
            <Animatable.View
              animation='zoomIn'
              iterationCount={1}
            >
              <Picture />
            </Animatable.View>
            <Animatable.View
              animation='fadeInLeft'
              iterationCount={1}
            >
              <Title
                title='SING IN'
                styles={styles.title}
              />
            </Animatable.View>
            <View style={{ paddingVertical: 8 }} />
            <View style={styles.container}>
              <InputControl
                stylesInput={styles.stylesInput}
                value={email}
                setValue={setEmail}
                placeholder='Correo'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={value => setEmail(value)}
                keyboardType='email-address'
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='mail'
              />

              <InputControl
                stylesInput={styles.stylesInput}
                value={password}
                setValue={setPassword}
                placeholder='Contraseña'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={value => setPassword(value)}
                secureTextEntry
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='lock'
              />
            </View>
            <Animatable.View
              style={styles.containerButton}
              animation='fadeInUp'
              iterationCount={1}
            >
              <IconButton
                message='INICIAR SESION'
                isActiveIcon
                iconName='person'
                stylesMessage={styles.message}
                onPress={handleOnSubmit}
                isLoading={loading}
              />
            </Animatable.View>
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  scrollView: {
    flexGrow: 1
  },
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  title: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.title
  },
  container: {
    paddingHorizontal: 20,
    width: '100%'
  },
  containerButton: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center'
  },
  message: {
    color: '#fff',
    fontSize: Theme.SIZES.small,
    fontFamily: 'Lato-Bold',
    marginLeft: 8
  }
})

export default SignInScreen
