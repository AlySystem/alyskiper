import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Picture from '../picture/Picture'
import { LazyImage } from '../lazy/LazyImage'

// Import theme
import { Theme } from '../../constants/Theme'

const Banner = props => {
  return (
    <View style={styles.container}>
      <LazyImage
        styleLazyImage={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover'
        }}
        sourceLazy={require('../../../assets/images/img-lazy.png')}
        source={props.sourceImage}
        styleImage={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover'
        }}
      />

      {props.sourceLogo && (
        <LazyImage
          styleLazyImage={{
            position: 'absolute',
            bottom: -30,
            right: 20,
            width: 80,
            height: 80,
            borderRadius: 200,
            resizeMode: 'cover'
          }}
          sourceLazy={require('../../../assets/images/img-lazy.png')}
          source={props.sourceLogo}
          styleImage={{
            position: 'absolute',
            bottom: -30,
            right: 20,
            width: 80,
            height: 80,
            borderRadius: 200,
            resizeMode: 'cover'
          }}
        />
      )}
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
    resizeMode: 'cover'
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
