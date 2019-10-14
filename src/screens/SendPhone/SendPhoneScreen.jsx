import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  Dimensions
} from 'react-native'
import * as Animatable from 'react-native-animatable'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const SendPhoneScreen = props => {
  const inputRef = useRef(null)
  const [numberPhone, setNumberPhone] = useState('')
  const heightScreen = new Animated.Value(150)

  const increaseHeightOfScreen = () => {
    Animated.timing(heightScreen, {
      toValue: height,
      duration: 500
    }).start(() => {
      inputRef.current.focus()
    })
  }

  const marginTop = heightScreen.interpolate({
    inputRange: [150, height],
    outputRange: [25, 70]
  })

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
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
          <Animated.View
            style={{
              marginTop: marginTop
            }}
          >
            <TouchableOpacity
              onPress={increaseHeightOfScreen}
            >
              <View
                pointerEvents='none'
              >
                <TextInput
                  ref={inputRef}
                  value={numberPhone}
                  placeholder='Numero de telefono'
                  placeholderTextColor={Theme.COLORS.colorParagraph}
                  onChangeText={(value) => setNumberPhone(value)}
                  keyboardType='number-pad'
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Animatable.View>
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
    paddingVertical: 10,
    paddingHorizontal: 10
  }
})

export default SendPhoneScreen
