import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Button
} from 'react-native'
import { useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Background from '../../components/background/Background'

const HomeScreen = props => {
  const { navigate } = props.navigation
  const userData = useSelector(state => state.user)

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <Button
            title='Transporte'
            onPress={() => navigate('Transport')}
          />
        </ScrollView>
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

export default HomeScreen
