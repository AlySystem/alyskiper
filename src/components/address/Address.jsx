import React from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text
} from 'react-native'

// Import components
import Picture from '../picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const Address = props => {
  return (
    <TouchableOpacity
      onPress={() => props.handleActive(props.id)}
      style={styles.container}
    >
      <Picture
        source={props.image}
        styles={styles.image}
      />
      <View style={{ paddingVertical: 4 }} />
      <Text style={[styles.name, {
        color: props.classActive ? Theme.COLORS.colorParagraph : Theme.COLORS.colorSecondary,
        textTransform: props.classActive ? 'uppercase' : 'lowercase'
      }]}
      >{props.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  name: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.small
  },
  image: {
    resizeMode: 'contain',
    width: 60,
    height: 60
  }
})

export default Address
