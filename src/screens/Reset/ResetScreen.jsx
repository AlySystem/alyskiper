import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'

// Import mutations
import { RESET } from '../../graphql/mutations/Mutations'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'
import InputControl from '../../components/input/InputControl'
import Picture from '../../components/picture/Picture'
import ModalPicker from '../../components/modal/ModalPicker'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const ResetScreen = props => {
  const { navigate } = props.navigation
  const [email, setEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const [Reset, { loading, data }] = useMutation(RESET)
  const [password, setPassword] = useState('')

  const [passwordIsValid, setPasswordIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })

  const [verifyPassword, setVerifyPassword] = useState('')
  const [verifyPasswordIsValid, setVerifyPasswordIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const handleVerifyPassword = value => {
    if (!value) {
      setVerifyPasswordIsValid({ isValid: false, message: 'La contraseña es requerida.', errorStyle: false })
    } else if (value.length < 8) {
      setVerifyPasswordIsValid({ isValid: false, message: 'La contraseña debe ser mayor a 8 digitos.', errorStyle: false })
    } else {
      setVerifyPasswordIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setVerifyPassword(value)
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
    if (handleConfirmPassword()) {
      if (emailIsValid.isValid && passwordIsValid.isValid) {
        const result = await Reset({
          variables: {
            input: {
              email,
              password,
              repeatpassword: password
            }
          }
        })

        if (result.data.changePasswordByEmail === 1) {
          showMessage({
            message: 'AlySkiper',
            description: 'Su contraseña fue actualizada correctamente.',
            backgroundColor: 'green',
            color: '#fff',
            icon: 'success',
            titleStyle: {
              fontFamily: 'Lato-Bold'
            },
            textStyle: {
              fontFamily: 'Lato-Regular'
            }
          })

          return navigate('SignIn')
        } else {
          showMessage({
            message: 'AlySkiper',
            description: 'Ha ocurrido un error al actualizar su contraseña, intente nuevamente',
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
        }


      }
    }
  }

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

  const handleConfirmPassword = () => {
    if (password !== verifyPassword) {
      showMessage({
        message: 'Error',
        description: 'Las contraseñas no coinciden',
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
      return false
    }
    return true
  }

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.layout}>
            <Picture
              source={require('../../../assets/images/img-alyskiper.png')}
            />
            <View style={{ paddingVertical: 10 }} />
            <Text allowFontScaling={false} style={styles.title}>
              Ingresa tu correo para poder restablecer tu contraseña, te enviaremos un código para confirmar que eres tu.
            </Text>
            <View style={{ paddingVertical: 10 }} />
            <View style={styles.container}>
              <InputControl
                stylesContainer={styles.containerInput}
                value={email}
                isActiveIcon
                iconName='mail'
                iconSize={22}
                // stylesIcon={styles.icon}
                placeholder='Correo'
                placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
                onChangeText={handleOnEmail}
                keyboardType='email-address'
                stylesError={styles.stylesError}
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

              <InputControl
                value={verifyPassword}
                setValue={setVerifyPassword}
                placeholder='Confirmar contraseña'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={handleVerifyPassword}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='lock'
                secureTextEntry
                stylesInput={[styles.stylesInput, { borderColor: verifyPasswordIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={verifyPasswordIsValid.isValid}
                errorText={verifyPasswordIsValid.message}
              />

            </View>
            <View style={{ paddingVertical: 20 }} />
            <IconButton
              message='ACEPTAR'
              isActiveIcon
              stylesButton={styles.button}
              onPress={handleOnSubmit}
              isLoading={loading}
            />
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
  icon: {
    position: 'absolute',
    left: 15,
    top: 9
  },
  stylesError: {
    position: 'absolute',
    bottom: -22,
    left: 10
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // borderColor: Theme.COLORS.colorSecondary,
    // borderWidth: 0.3,
    // borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 5,
    // backgroundColor: Theme.COLORS.colorMainAlt
  },
  containerInput: {
    position: 'relative'
  },
  input: {
    width: 180,
    height: 40,
    paddingLeft: 48,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph,
    borderLeftColor: Theme.COLORS.colorSecondary,
    borderLeftWidth: 0.3
  },
  layout: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  },
  error: {
    position: 'absolute',
    bottom: -17,
    left: 8
  },
  scrollView: {
    flexGrow: 1
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 57,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 210,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
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
})

export default ResetScreen
