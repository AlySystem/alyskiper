import React from 'react'

import {
  View,
  Text,
  Button
} from 'react-native'

const HomeScreen = props => {
  const { navigate } = props.navigation
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title='SIGNIN'
        onPress={() => navigate('SignIn')}
      />
    </View>
  )
}

export default HomeScreen
