import React from 'react'
import {
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'

// Import defaultImage
import defaultImage from '../../../assets/images/img-logo-skiper.png'

const { width, height } = Dimensions.get('window')

const Picture = props => {
  return (
    <Image
      {...props}
      source={props.source}
      style={props.styles || styles.image}
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
