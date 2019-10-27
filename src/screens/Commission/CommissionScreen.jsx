import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const CommissionScreen = props => {
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

export default CommissionScreen
