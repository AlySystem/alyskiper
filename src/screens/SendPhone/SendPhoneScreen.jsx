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
import * as Animatable from 'react-native-animatable'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import Icon from '../../components/icon/Icon'
import IconButton from '../../components/button/IconButton'
import Button from '../../components/button/Button'
import ListOfPhone from '../../containers/ListOfCode'

// Import theme
import { Theme } from '../../constants/Theme'

// Import image
import background from '../../../assets/images/img-background-dark.png'
import logo from '../../../assets/images/logo.png'

const { height } = Dimensions.get('window')

const SendPhoneScreen = props => {
  const inputRef = useRef(null)
  const [numberPhone, setNumberPhone] = useState('')
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
            styles={styles.background}
          >
            <Animated.View
              style={{
                marginTop: marginTop,
                paddingHorizontal: 20
              }}
            >
              <Text style={styles.subtitle}>Cuenta conmigo</Text>
              <View style={{ paddingVertical: 10 }} />
              <TouchableOpacity
                onPress={increaseHeightOfScreen}
              >
                <View
                  pointerEvents={event}
                  style={styles.containerInput}
                >
                  <ListOfPhone />
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
                    iconName='phone'
                  />
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
                onPress={() => console.log('onPress')}
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
    width: '100%'
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
    paddingLeft: 55,
    paddingVertical: 12,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
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
  }
})

export default SendPhoneScreen
