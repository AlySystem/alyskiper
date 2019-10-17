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
import Button from '../../components/button/Button'
import ModalPicker from '../../components/modal/ModalPicker'
import InputControl from '../../components/input/InputControl'
import Header from '../../components/header/Header'
import Icon from '../../components/icon/Icon'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const SendPhoneScreen = props => {
  const { navigate } = props.navigation
  const [SendCode, { loading }] = useMutation(SENDCODE)

  const inputRef = useRef(null)
  const [numberPhone, setNumberPhone] = useState('')
  const [event, setEvent] = useState('none')
  const heightScreen = new Animated.Value(150)

  const incrementeHeight = () => {
    Animated.timing(heightScreen, {
      toValue: height,
      duration: 500
    }).start(() => {
      inputRef.current.focus()
      setEvent('auto')
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
    outputRange: [25, 200]
  })
  const headerBackOpacity = heightScreen.interpolate({
    inputRange: [150, height],
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
              justifyContent: 'center'
            }}
          >
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
                  marginTop: marginTop
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
  }
})

export default SendPhoneScreen
