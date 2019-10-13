import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'

const HomeScreen = props => {
  return (
    <Background>
      <View style={styles.screen} />
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export default HomeScreen
