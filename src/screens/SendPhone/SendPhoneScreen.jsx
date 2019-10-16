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
import Button from '../../components/button/Button'
import ModalPicker from '../../components/modal/ModalPicker'
import InputControl from '../../components/input/InputControl'

// Import theme
import { Theme } from '../../constants/Theme'

// Import image
import logo from '../../../assets/images/logo.png'

const { height } = Dimensions.get('window')

const SendPhoneScreen = props => {
  const { navigate } = props.navigation
  const [SendCode, { loading }] = useMutation(SENDCODE)

  const inputRef = useRef(null)
  const [numberPhone, setNumberPhone] = useState('')
  const [event, setEvent] = useState('none')
  const heightScreen = new Animated.Value(100)

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
      toValue: 100,
      duration: 500
    }).start(() => {
      setEvent('none')
    })
  }

  const marginTop = heightScreen.interpolate({
    inputRange: [100, height],
    outputRange: [25, 70]
  })

  const buttonOpacity = heightScreen.interpolate({
    inputRange: [100, height],
    outputRange: [0, 1]
  })

  const backButton = heightScreen.interpolate({
    inputRange: [130, height],
    outputRange: [0, 1]
  })

  // const handleOnSubmit = async () => {
  //   const result = await SendCode({ variables: { sendcode: { phone_number: `${details.phoneCode}${numberPhone}`, channel: 'sms' } } })
  //   const { ok, message } = result.data.send_code

  //   if (!ok) {
  //     showMessage({
  //       message: 'Error',
  //       description: message,
  //       backgroundColor: 'red',
  //       color: '#fff',
  //       icon: 'danger',
  //       titleStyle: {
  //         fontFamily: 'Lato-Bold'
  //       },
  //       textStyle: {
  //         fontFamily: 'Lato-Regular'
  //       }
  //     })
  //     return
  //   }
  //   navigate('VerifyPhone', {
  //     number: `${details.phoneCode}${numberPhone}`
  //   })
  // }

  const handleOnSelect = (details) => {
    console.log(details)
  }

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>

          {/* BUTTON BACK PARA BAJAR LA SCREEN */}
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

          {/* LOGO QUE SE MUESTRAS AL AGRANDAR LA PANTALLA */}
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

          {/* LOGO EN LA SCREEN PRINCIPAL */}
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

          {/* CONTENEDOR DE LA PARTE INFERIOR */}
          <Animatable.View
            animation='fadeInUp'
            iterationCount={1}
            style={[styles.container, { height: heightScreen }]}
          >
            {/* CONTAINER INPUTS */}
            <Animated.View
              style={{
                marginTop: marginTop
              }}
            >
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',

                  paddingHorizontal: 10,
                  flex: 1
                }}
                pointerEvents={event}
                onPress={increaseHeightOfScreen}
              >
                <InputControl
                  references={inputRef}
                  stylesInput={styles.input}
                  stylesContainer={styles.containerInput}
                  value={numberPhone}
                  isActiveIcon
                  iconName='phone'
                  iconSize={22}
                  stylesIcon={styles.icon}
                  placeholder='77289801'
                  placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
                  onChangeText={(value) => setNumberPhone(value)}
                  keyboardType='number-pad'
                />
                <ModalPicker
                  handleOnSelect={handleOnSelect}
                />
              </View>
            </Animated.View>

            {/* BUTTON SUBMIT */}
            <Animatable.View
              style={[styles.containerButton, {
                opacity: buttonOpacity
              }]}
            >
            </Animatable.View>
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
  title: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
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
  containerInput: {
    position: 'relative'
  },
  input: {
    width: 250,
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 5,
    paddingLeft: 48,
    paddingVertical: 9,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  icon: {
    position: 'absolute',
    top: 13,
    left: 15
  }
})

export default SendPhoneScreen
