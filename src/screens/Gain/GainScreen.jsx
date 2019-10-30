import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const GainScreen = props => {
  return (
    <View style={styles.container} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS.colorMainDark
  }
})

export default GainScreen
