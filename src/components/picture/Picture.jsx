import React from 'react'
import {
  StyleSheet,
  Dimensions
} from 'react-native'

import FastImage from 'react-native-fast-image'

// Import defaultImage
import defaultImage from '../../../assets/images/img-logo-skiper.png'

const { width, height } = Dimensions.get('window')

const Picture = props => {
  return (
    <FastImage
      {...props}
      style={props.styles || styles.image}
      source={props.source}
      resizeMode={FastImage.resizeMode.contain}
    />
  )
}

Picture.defaultProps = {
  source: defaultImage
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height: height * 0.2,
    width: width * 0.7
  }
})

export default Picture
