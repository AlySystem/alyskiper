import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Picture from '../picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const Banner = props => {
  return (
    <View style={styles.container}>
      <Picture
        source={props.sourceImage}
        styles={styles.image}
      />
      <Picture
        source={props.sourceLogo}
        styles={styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: '100%',
    position: 'relative',
    backgroundColor: Theme.COLORS.colorMainDark
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  logo: {
    position: 'absolute',
    bottom: -30,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    resizeMode: 'cover'
  }
})

export default Banner
