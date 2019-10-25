import React from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text
} from 'react-native'
import LottieView from 'lottie-react-native'

// Import animations
import Location from '../../../world-locations.json'

// Import theme
import { Theme } from '../../constants/Theme.js'

const LocationScreen = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
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
  }
})

export default LocationScreen
