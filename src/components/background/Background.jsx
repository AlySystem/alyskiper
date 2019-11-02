import React from 'react'
import {
  ImageBackground,
  StyleSheet
} from 'react-native'

// Import image default
import defaultImage from '../../../assets/images/img-background.png'

const Background = props => {
  return (
    <ImageBackground
      source={props.source}
      style={props.styles || styles.background}
    >
      {props.children}
    </ImageBackground>
  )
}

Background.defaultProps = {
  source: defaultImage
}

const styles = StyleSheet.create({
  background: {
    resizeMode: 'cover',
    flex: 1,
    position: 'relative'
  }
})

export default Background
