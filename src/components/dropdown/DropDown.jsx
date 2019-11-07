import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const DropDown = props => {
  return (
    <View style={styles.containerDropDown}>
      {props.children}
    </View>
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
