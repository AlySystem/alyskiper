import React from 'react'
import {
  StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'

// Import theme
import { Theme } from '../../constants/Theme'

const DropDown = props => {
  return (
    <Animatable.View
      style={styles.containerDropDown}
      animation='lightSpeedIn'
      iterationCount={1}
    >
      {props.children}
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  containerDropDown: {
    backgroundColor: Theme.COLORS.colorMain,
    borderRadius: 8,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 60,
    right: 10,
    zIndex: 20000000
  }
})

export default DropDown
