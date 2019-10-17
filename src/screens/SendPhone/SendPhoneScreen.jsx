import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'
import * as Animatable from 'react-native-animatable'

// Import mutations
import { SENDCODE } from '../../graphql/mutations/Mutations'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import IconButton from '../../components/button/IconButton'
import ModalPicker from '../../components/modal/ModalPicker'
import InputControl from '../../components/input/InputControl'
import Header from '../../components/header/Header'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const SendPhoneScreen = props => {
  const { navigate } = props.navigation
  const [SendCode, { loading }] = useMutation(SENDCODE)

  const inputRef = useRef(null)
  const [numberPhone, setNumberPhone] = useState('')
  const [event, setEvent] = useState('none')
  const [details, setDetails] = useState({})
  const [numberPhoneIsValid, setNumberPhoneIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })

  const heightScreen = new Animated.Value(150)

  const incrementeHeight = () => {
    Animated.timing(heightScreen, {
      toValue: height,
      duration: 500
    }).start(() => {
      setEvent('auto')
      inputRef.current.focus()
    })
  }

  const decrementHeight = () => {
    Keyboard.dismiss()
    Animated.timing(heightScreen, {
      toValue: 150,
      duration: 500
    }).start(() => {
      setEvent('none')
    })
  }

  const headerOpacity = heightScreen.interpolate({
    inputRange: [150, height],
    outputRange: [1, 0]
  })

  const marginTop = heightScreen.interpolate({
    inputRange: [150, height],
    outputRange: [25, 230]
  })

  const marginTopMax = heightScreen.interpolate({
    inputRange: [150, height],
    outputRange: [25, 240]
  })

  const marginTopButton = heightScreen.interpolate({
    inputRange: [150, height],
    outputRange: [25, 360]
  })

  const headerBackOpacity = heightScreen.interpolate({
    inputRange: [150, height],
    outputRange: [0, 1]
  })

  const titleTextOpacity = heightScreen.interpolate({
    inputRange: [150, height],
    outputRange: [0, 1]
  })

  const handleOnSubmit = async () => {
    if (numberPhoneIsValid.isValid) {
      const result = await SendCode({ variables: { sendcode: { phone_number: `${details.phoneCode}${numberPhone}`, channel: 'sms' } } })
      const { ok, message } = result.data.send_code

      if (!ok) {
        showMessage({
          message: 'Error',
          description: message,
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
      } else {
        navigate('VerifyPhone', {
          number: `${details.phoneCode}${numberPhone}`
        })
      }
    }
  }

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

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <Header
            animationImage='fadeInLeft'
            animationButton='fadeInLeft'
            onPress={() => props.navigation.goBack()}
            stylesContainer={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              paddingVertical: 12
            }}
          />

          <Animated.View
            style={{
              zIndex: 1000,
              opacity: headerBackOpacity,
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <Header
              animationImage='fadeInLeft'
              animationButton='fadeInLeft'
              onPress={decrementHeight}
              iconName='arrow-back'
              stylesContainer={{
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12
              }}
            />
          </Animated.View>

          <Animatable.View
            animation='zoomIn'
            iterationCount={1}
            style={styles.container}
          >
            <Picture />
            <View style={{ paddingVertical: 5 }} />
            <Text style={styles.title}>Estas a solo unos pasos de ser parte de Skiper</Text>
            <View style={{ paddingVertical: 1 }} />
            <Text style={styles.title}>Ingresa tu numero de telefono.</Text>
          </Animatable.View>

          <Animatable.View
            animation='slideInUp'
            iterationCount={1}
            style={{
              width: '100%',
              height: heightScreen,
              backgroundColor: Theme.COLORS.colorMainAlt,
              paddingHorizontal: 10,
              paddingVertical: 12
            }}
          >
            <Animated.View
              style={{
                opacity: titleTextOpacity,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: marginTopButton
              }}
            >
              <IconButton
                isActiveIcon
                message='Enviar'
                isLoading={loading}
                onPress={handleOnSubmit}
              />
            </Animated.View>

            <TouchableOpacity
              onPress={incrementeHeight}
            >
              <Animated.View
                style={{
                  opacity: headerOpacity
                }}
              >
                <Text style={styles.description}>Cuenta conmigo</Text>
              </Animated.View>

              <Animated.View
                style={{
                  opacity: titleTextOpacity,
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: marginTop
                }}
              >
                <Text style={styles.descriptionAlt}>Ingresa tu numero de telefono</Text>
              </Animated.View>

              <Animated.View
                style={{
                  marginTop: marginTopMax
                }}
              >
                <Animated.View
                  pointerEvents={event}
                  style={styles.containerRow}
                >
                  <ModalPicker
                    handleOnSelect={handleOnSelect}
                  />
                  <InputControl
                    references={inputRef}
                    stylesContainer={styles.containerInput}
                    value={numberPhone}
                    isActiveIcon
                    iconName='phone'
                    iconSize={22}
                    stylesIcon={styles.icon}
                    placeholder='77289801'
                    placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
                    onChangeText={handleOnChange}
                    keyboardType='number-pad'
                    stylesError={styles.stylesError}
                    stylesInput={[styles.input, { borderColor: numberPhoneIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                    isValid={numberPhoneIsValid.isValid}
                    errorText={numberPhoneIsValid.message}
                  />
                </Animated.View>

              </Animated.View>
            </TouchableOpacity>

          </Animatable.View>

        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'relative'
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerInput: {
    position: 'relative'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    fontFamily: 'Lato-Regular',
    textAlign: 'center'
  },
  description: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.subTitle,
    fontFamily: 'Lato-Bold'
  },
  descriptionAlt: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  },
  input: {
    width: 230,
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 40,
    paddingLeft: 48,
    paddingVertical: 9,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  stylesError: {
    position: 'absolute',
    bottom: -18,
    left: 10
  }
})

export default SendPhoneScreen
