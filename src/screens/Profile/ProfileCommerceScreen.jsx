import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'

const ProfileCommerceScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <Text>ProfileCommerceScreen</Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {

  }
})

export default ProfileCommerceScreen
