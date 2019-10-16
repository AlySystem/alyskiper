import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
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
import Icon from '../../components/icon/Icon'
import IconButton from '../../components/button/IconButton'
import Button from '../../components/button/Button'

// Import container
import ListOfCountries from '../../containers/ListOfCountries'

// Import theme
import { Theme } from '../../constants/Theme'

// Import image
import background from '../../../assets/images/img-background-dark.png'
import logo from '../../../assets/images/logo.png'

const { height } = Dimensions.get('window')

const SendPhoneScreen = props => {
  const { navigate } = props.navigation
  const [SendCode, { loading }] = useMutation(SENDCODE)

  const inputRef = useRef(null)
  const [numberPhone, setNumberPhone] = useState('')
  const [details, setDetails] = useState({
    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAqBQTFRFYpH1YZH1dZTGZJHuYZH2YpD1YpD2ZpLrbJHVcpHAZpHn5Oz95Oz+3+by1NCs39zC5Ov65Oz/3ubZ4Oji5Oz7393J1dK04ej03+bx1NGz5OHI6O765u7/5u7+6O773+DV1dO23+XuZ4/cgpemeJW8ZpHpYpH2YZH3Z5LmfJa4f5WpZI3eU4f0Uof2U4f1VofsYYrUYYnSVYfuVIfyV4fnXIjaZovIW4njc46vdY2lVobpY4nMZYnGWIfoUob0Uob1WojhcY6yXYbTXYfWVIbvXYnhXIniUobxW4fccY2ub422V4blaJDac5PCgrCofqyzW+q5Zum5///////+9fDZ8erM/Pv0///57s13rIZNr4lM8tSG///9+/nx8enH+vbo/Pr07eO09/Ph8ujHjo54cneElJR79u7T8+7X8OjB/v78+PXo6uK5+ffs//3upd2rKcTnLMfiLMTiK8TlseGv//70+ffr7ua/+fft+fbn7uW6+/rz3vW7MvfRCP71GPHkGuziA//6OPjQ5vfG/Pv17ubB9/Tl9/Ti7uW3/Pv3//jih82yQMqQZ8thVM99Ws5yXM1vO8+6lc+2//vq+/r17ObK+ffv//7+/Prv///81dCvWHupXY9TdJU7c5Q9c5Q6dpY3bI1eZICl3di48+zP/fz2+vTa/v35+/PQipixSG/nSnPlSnDlSnLjS3DjSnPiS3LgSm/jlp6u/ffb/fvw+vXc+vjw8+3T+fHL3NvE19jN2NfM19jM19fM19bN39vD+vTS+fTf+vfrXIjbbIq0do6kZYrJV4flU4fxVYbsWofdY4nKaIm7aYvBXYjbUof0WIjnaIvDZYjBaYzEZ4vHbYu0Z4i6YYnTVIfwVYftWIfiXIneXIjfWIflVYfsUof1JwACHgAAACx0Uk5T/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v4R0Yc9AAAAAWJLR0RSDWAtkAAAAAlwSFlzAAAASAAAAEgARslrPgAAAXhJREFUOMtj0CESMAxRhbq6RCjU09HRNzA0MgYx8Co0MTUzt7C0sraxRVdohwzsHRydnF1c3dw9PL28UWTsGJABo48vEzMLq58/Gws7BycXI4okNwLw8PLxC/AICgUECgvyiIiKifMgSTIEIUBwSGhYUFB4RGRUdExQUGxcPJJcELLChMQkIJmckpqalg5kZGRm4VCYnZMbFJSXX1BYVFxSGhRUVl6BQ2FlVXVQUE1tXX1DY1NzUFBLaxsOhe0dnUFd3T29ff0TJk6aHDRl6jQcCqfPyJo5a/acufPmL1i4aHFQ9ZKlOBQGLVu+YuWq1WvWrlu/YeOmzVu24vJ10LbtO3bu2r1n997du/ftP3DwEIpC5ACXkJSSlpEFAxk5eQVFlABHBixKyiqqLCwMaizqGppa2iwokqiJ4vCRo8eOnzh56vSZs+fOoyYKtOR44aLjpctXrl67fkMPf3rU07l56/adu/fuE5EV9O7r6enpEKGQBrmQTgoB+l4eQVzTJI0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTAtMDdUMTM6MTQ6MjgrMDI6MDDo/EIvAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTEwLTA3VDEzOjE0OjI4KzAyOjAwmaH6kwAAAABJRU5ErkJggg==',
    phoneCode: '+505'
  })
  const [isVisible, setIsVisible] = useState(false)
  const [event, setEvent] = useState('none')
  const heightScreen = new Animated.Value(200)

  const increaseHeightOfScreen = () => {
    Animated.timing(heightScreen, {
      toValue: height,
      duration: 500
    }).start(() => {
      inputRef.current.focus()
      setEvent('auto')
    })
  }

  const decreaseHeightOfScreen = () => {
    Keyboard.dismiss()
    Animated.timing(heightScreen, {
      toValue: 200,
      duration: 500
    }).start(() => {
      setEvent('none')
    })
  }

  const marginTop = heightScreen.interpolate({
    inputRange: [200, height],
    outputRange: [25, 70]
  })

  const buttonOpacity = heightScreen.interpolate({
    inputRange: [200, height],
    outputRange: [0, 1]
  })

  const backButton = heightScreen.interpolate({
    inputRange: [200, height],
    outputRange: [0, 1]
  })

  const handleOnSelect = (details) => {
    setDetails({
      uri: details.flag,
      phoneCode: `+${details.phonecode}`
    })
  }

  const handleOnSubmit = async () => {
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
      return
    }
    navigate('VerifyPhone', {
      number: `${details.phoneCode}${numberPhone}`
    })
  }

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <Animated.View
            style={[styles.backButton, {
              opacity: backButton
            }]}
          >
            <Button
              iconName='arrow-back'
              onPress={decreaseHeightOfScreen}
            />
          </Animated.View>

          <Animated.View
            style={[styles.logoType, {
              opacity: backButton
            }]}
          >
            <Picture
              source={logo}
              styles={styles.image}
            />
          </Animated.View>

          <Animatable.View
            animation='zoomIn'
            iterationCount={1}
            style={styles.containerImage}
          >
            <Picture />
            <View style={{ paddingVertical: 5 }} />
            <Text style={styles.title}>Estas a solo unos pasos de ser parte de Skiper</Text>
            <View style={{ paddingVertical: 1 }} />
            <Text style={styles.title}>Ingresa tu numero de telefono.</Text>
          </Animatable.View>
        </View>
        <Animatable.View
          animation='fadeInUp'
          iterationCount={1}
          style={[styles.container, { height: heightScreen }]}
        >
          <Background
            source={background}
          >
            <Animated.View
              style={{
                marginTop: marginTop,
                paddingHorizontal: 10
              }}
            >
              <Text style={styles.subtitle}>Cuenta conmigo</Text>
              <View style={{ paddingVertical: 10 }} />
              <TouchableOpacity
                onPress={increaseHeightOfScreen}
              >
                {isVisible && (
                  <ListOfCountries
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    handleOnSelect={handleOnSelect}
                  />
                )}
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity
                    style={styles.containerCountry}
                    onPress={() => setIsVisible(true)}
                  >
                    <Picture
                      styles={styles.flag}
                      source={{ uri: details.uri }}
                    />
                    <Text style={styles.code}>{details.phoneCode}</Text>
                  </TouchableOpacity>

                  <View
                    pointerEvents={event}
                    style={styles.containerInput}
                  >
                    <TextInput
                      ref={inputRef}
                      style={styles.input}
                      value={numberPhone}
                      placeholder='Numero de telefono'
                      placeholderTextColor={Theme.COLORS.colorParagraph}
                      onChangeText={(value) => setNumberPhone(value)}
                      keyboardType='number-pad'
                      underlineColorAndroid='transparent'
                      multiline={false}
                      autoCapitalize='none'
                      autoCorrect={false}
                    />
                    <Icon
                      styles={styles.icon}
                      iconSize={23}
                      iconName='phone'
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
            <Animatable.View
              style={[styles.containerButton, {
                opacity: buttonOpacity
              }]}
            >
              <IconButton
                message='ENVIAR'
                isActiveIcon
                // onPress={handleOnSubmit}
                onPress={() => navigate('VerifyPhone')}
                isLoading={loading}
              />
            </Animatable.View>
          </Background>
        </Animatable.View>
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
  title: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  },
  subtitle: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.title
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    width: '100%'
  },
  containerInput: {
    position: 'relative',
    width: 240
  },
  icon: {
    position: 'absolute',
    top: 13,
    left: 18
  },
  image: {
    resizeMode: 'contain',
    width: 130,
    height: 40,
    marginHorizontal: 10
  },
  input: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 20,
    paddingLeft: 50,
    paddingVertical: 10,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.xsmall,
    color: Theme.COLORS.colorParagraph
  },
  containerButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 20,
    zIndex: 1000
  },
  logoType: {
    position: 'absolute',
    top: 15,
    right: 10,
    zIndex: 1000
  },
  flag: {
    width: 35,
    height: 23
  },
  code: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small,
    paddingLeft: 5
  },
  containerCountry: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SendPhoneScreen
