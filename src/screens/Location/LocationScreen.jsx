import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import LottieView from 'lottie-react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import animation
import Location from '../../../world-locations.json'

// Import hooks
import { useLocation } from '../../hooks/useLocation'

// Import components
import Background from '../../components/background/Background'

const LocationScreen = props => {
  const { navigate } = props.navigation
  const { isLoaded } = useLocation()

  useEffect(() => {
    const verifyLoaded = () => {
      if (!isLoaded) return navigate('Home')
    }
    verifyLoaded()
  }, [isLoaded])

  return (
    <Background
      source={require('../../../assets/images/img-background-alyskiper.png')}
    >
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,.3)',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
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
        <Text style={styles.text}>OBTENIENDO UBICACION</Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  text: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal
  }
})

export default LocationScreen
