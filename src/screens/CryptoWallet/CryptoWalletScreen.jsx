import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import Background from '../../components/background/Background'

const CryptoWalletScreen = props => {
  return (
    <Background>
      <View style={styles.screen} />
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})

export default CryptoWalletScreen
