import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'

// Import containers
import ListOfData from '../../containers/ListOfData'

const WelcomeScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <ListOfData />
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

export default WelcomeScreen
