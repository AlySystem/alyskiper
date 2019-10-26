import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Keyboard,
  Dimensions
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useMutation } from '@apollo/react-hooks'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'
import InputControl from '../../components/input/InputControl'

// Import theme
import { Theme } from '../../constants/Theme'

// Import mutations
import { EDITPASSWORD } from '../../graphql/mutations/Mutations'

const { height } = Dimensions.get('window')

const ResetPasswordScreen = props => {
  const [EditPassword, { loading }] = useMutation(EDITPASSWORD)
  const { navigate } = props.navigation
  const [id] = useState(props.navigation.getParam('id', ''))
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

  const handlePassword = value => {
    if (!value) {
      setPasswordIsValid({ isValid: false, message: 'La contraseña es requerida.', errorStyle: false })
    } else if (value.length < 8) {
      setPasswordIsValid({ isValid: false, message: 'La contraseña debe ser mayor a 8 digitos.', errorStyle: false })
    } else {
      setPasswordIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setPassword(value)
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

  const handleOnSubmit = async () => {
    if (handleConfirmPassword()) {
      if (passwordIsValid.isValid && verifyPasswordIsValid.isValid) {
        Keyboard.dismiss()
        const { data: { editPassword } } = await EditPassword({ variables: { input: { newPassword: password, id } } })
        if (editPassword.message === 'Update password successfuly!!') {
          navigate('SignIn')
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
        }
      }
    }
  }

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <View style={styles.container}>
            <InputControl
              value={password}
              setValue={setPassword}
              placeholder='Contraseña'
              placeholderTextColor={Theme.COLORS.colorParagraph}
              onChangeText={handlePassword}
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

          <View style={{ paddingVertical: 15 }} />
          <IconButton
            message='CONFIRMAR'
            isActiveIcon
            isLoading={loading}
            onPress={handleOnSubmit}
          />

        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%'
  },
  stylesInput: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 55,
    paddingVertical: 12,
    marginBottom: height * 0.03,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  }
})

export default ResetPasswordScreen
