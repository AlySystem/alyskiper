import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard
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

const ResetScreen = props => {
  const { navigate } = props.navigation
  const [numberPhone, setNumberPhone] = useState('')
  const [details, setDetails] = useState({})
  const [numberPhoneIsValid, setNumberPhoneIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const [Reset, { loading }] = useMutation(RESET)

  const handleOnSelect = (details) => {
    setDetails(details)
  }

  const handleOnChange = value => {
    if (!value) {
      setNumberPhoneIsValid({ isValid: false, message: 'El numero es requerido.', errorStyle: false })
    } else {
      setNumberPhoneIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setNumberPhone(value)
  }

  const handleOnSubmit = async () => {
    if (numberPhoneIsValid.isValid) {
      Keyboard.dismiss()
      const { data: { reset_password: { data, error } } } = await Reset({ variables: { phone_number: `${details.phoneCode}${numberPhone}` } })

      if (error) {
        if (error.message === 'Max send attempts reached') {
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
        if (error.message === 'Phone not exist!!') {
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
      }
      if (data) {
        navigate('VerifyPhone', {
          routeName: 'ResetPassword',
          id: data.id,
          number: `${details.phoneCode}${numberPhone}`
        })
      }
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
            <Picture
              source={require('../../../assets/images/img-alyskiper.png')}
            />
            <View style={{ paddingVertical: 10 }} />
            <Text allowFontScaling={false} style={styles.title}>Ingresa tu numero para poder restablecer tu contraseña, te enviaremos un código para confirmar que eres tu.</Text>
            <View style={{ paddingVertical: 10 }} />
            <View style={styles.container}>
              <ModalPicker
                handleOnSelect={handleOnSelect}
              />
              <InputControl
                stylesContainer={styles.containerInput}
                value={numberPhone}
                isActiveIcon
                iconName='phone'
                iconSize={22}
                stylesIcon={styles.icon}
                placeholder='7728  9801'
                placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
                onChangeText={handleOnChange}
                keyboardType='number-pad'
                stylesError={styles.stylesError}
                stylesInput={[styles.input, { borderColor: numberPhoneIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={numberPhoneIsValid.isValid}
                errorText={numberPhoneIsValid.message}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.3,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: Theme.COLORS.colorMainAlt
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
  }
})

export default ResetScreen
