import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text
} from 'react-native'
import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable'

// Import animations
import Location from '../../../world-locations.json'

// Import hooks
import { useLocation } from '../../hooks/useLocation'

// Import theme
import { Theme } from '../../constants/Theme.js'
import Picture from '../../components/picture/Picture.jsx'

const LocationScreen = props => {
  const { navigate } = props.navigation
  const { isLoading } = useLocation()

  const verifyState = (isLoading) => {
    if (!isLoading) return navigate('Home')
  }

  useEffect(() => {
    verifyState(isLoading)
  }, [verifyState, isLoading])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animatable.View
          animation='bounce'
          iterationCount={1}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
        >
          <Picture
            source={require('../../../assets/images/logo.png')}
            styles={styles.image}
          />
        </Animatable.View>
        <LottieView
          style={{
            width: 300,
            height: 300
          }}
          source={Location}
          autoPlay
          autoSize
          resizeMode='contain'
          loop
        />
        <Text style={styles.title}>OBTENIENDO UBICACION...</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  },
  image: {
    resizeMode: 'contain',
    width: 130,
    height: 40
  }
})

export default LocationScreen
