import React, { useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'

// Import theme
import { Theme } from '../../constants/Theme'

const AddressScreen = props => {
  return (
    <Background>
      <View style={styles.screen} />
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  }
})

export default AddressScreen
