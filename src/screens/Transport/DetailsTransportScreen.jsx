import React from 'react'
import {
  View,
  StyleSheet,
  Button
} from 'react-native'

// Import components
import Background from '../../components/background/Background'

const DetailsTransportScreen = props => {
  const { navigate } = props.navigation

  return (
    <Background>
      <View style={styles.screen}>
        <Button
          title='Escanear QR'
          onPress={() => navigate('Scanner')}
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  }
})

export default DetailsTransportScreen
