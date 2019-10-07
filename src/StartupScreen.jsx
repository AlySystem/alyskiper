import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import components
import Background from './components/background/Background'
import Picture from './components/picture/Picture'

const StartupScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <Picture />
        <View style={{ paddingVertical: 15 }} />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})

export default StartupScreen
