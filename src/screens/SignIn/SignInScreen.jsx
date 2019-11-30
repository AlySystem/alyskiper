import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  TouchableOpacity
} from 'react-native'
import decodeJwt from 'jwt-decode'
import * as Animatable from 'react-native-animatable'
import { showMessage } from 'react-native-flash-message'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'

// Actions types
import { USERDATA } from '../../store/actionTypes'

// Import mutations
import { SIGNIN } from '../../graphql/mutations/Mutations'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import Title from '../../components/title/Title'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'
import Snow from '../../components/snow/Snow'

// Import theme
import { Theme } from '../../constants/Theme'

// Import utils
import { setAsyncStorage } from '../../utils/AsyncStorage'
import { keys } from '../../utils/keys'

const { height } = Dimensions.get('window')

const SignInScreen = props => {
  const { navigate } = props.navigation
  const dispatch = useDispatch()
  const [SignIn, { loading }] = useMutation(SIGNIN)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailIsValid, setEmailIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })

  const [passwordIsValid, setPasswordIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })

  const handleOnEmail = value => {
    const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)

    if (!value) {
      setEmailIsValid({ isValid: false, message: 'El correo es requerido.', errorStyle: false })
    } else if (!emailPattern.test(value)) {
      setEmailIsValid({ isValid: false, message: 'El correo es invalido.', errorStyle: false })
    } else {
      setEmailIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setEmail(value.toLowerCase())
  }

  const handleOnPassword = value => {
    if (!value) {
      setPasswordIsValid({ isValid: false, message: 'La contraseña es requerida.', errorStyle: false })
    } else if (value.length < 8) {
      setPasswordIsValid({ isValid: false, message: 'La contraseña debe ser mayor a 8 digitos.', errorStyle: false })
    } else {
      setPasswordIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setPassword(value)
  }

  const handleOnSubmit = async () => {
    if (emailIsValid.isValid && passwordIsValid.isValid) {
      Keyboard.dismiss()
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
          userName: data.username,
          email: data.email,
          phoneNumber: data.phone_number,
          avatar: data.avatar,
          country: data.country.name,
          country_id: data.country.id,
          city_id: data.city ? data.city.id : null,
          cityName: data.city ? data.city.name : null,
          iso: data.country.iso.toLowerCase()
        }
        setAsyncStorage(keys.asyncStorageKey, payload)
        dispatch({
          type: USERDATA,
          payload
        })
        navigate('Home')
      }
    }
  }

  return (
    <Background>

      <Snow />

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
                title='SIGN IN'
                styles={styles.title}
              />
            </Animatable.View>
            <View style={{ paddingVertical: 8 }} />
            <View style={styles.container}>
              <InputControl
                value={email}
                setValue={setEmail}
                placeholder='Correo'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={handleOnEmail}
                keyboardType='email-address'
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='mail'
                stylesInput={[styles.stylesInput, { borderColor: emailIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={emailIsValid.isValid}
                errorText={emailIsValid.message}
              />

              <InputControl
                value={password}
                setValue={setPassword}
                placeholder='Contraseña'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={handleOnPassword}
                secureTextEntry
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='lock'
                stylesInput={[styles.stylesInput, { borderColor: passwordIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={passwordIsValid.isValid}
                errorText={passwordIsValid.message}
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
              <View style={{ paddingVertical: 10 }} />
              <TouchableOpacity
                onPress={() => navigate('Reset')}
              >
                <Text allowFontScaling={false} style={styles.text}>¿Olvido su contraseña?</Text>
              </TouchableOpacity>
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
    fontSize: Theme.SIZES.xsmall,
    fontFamily: 'Lato-Bold',
    marginLeft: 8
  },
  stylesInput: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 55,
    paddingRight: 50,
    paddingVertical: 12,
    marginBottom: height * 0.03,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  text: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.small
  }
})

export default SignInScreen
