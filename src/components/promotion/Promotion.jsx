import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'

// Import image
import Picture from '../picture/Picture'

const { width, height } = Dimensions.get('window')

const Promotion = props => {
  return (
    <TouchableOpacity
      style={props.stylesContainer || styles.container}
      activeOpacity={props.activeOpacity}
      onPress={props.onPress}
    >
      <Picture
        source={props.source}
        styles={props.stylesImage || styles.image}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: width * 0.8,
    height: height * 0.2
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 8
  }
})

export default Promotion
