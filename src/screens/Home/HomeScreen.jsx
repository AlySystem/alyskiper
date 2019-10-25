import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native'
import { useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'

// Import theme
import { Theme } from '../../constants/Theme'

// Import containers
import ListOfSwiper from '../../containers/ListOfSwiper'
import ListOfBanner from '../../containers/ListOfBanner'

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
          <Animatable.View
            animation='zoomIn'
            iterationCount={1}
          >
            <ListOfBanner />
          </Animatable.View>
          <View style={{ paddingVertical: 20 }} />
          <Button
            title='Transporte'
            onPress={() => navigate('Transport')}
          />

          <Button
            title='Commerce'
            onPress={() => navigate('Commerce')}
          />
          <View style={{ paddingVertical: 20 }} />
          <Animatable.View
            animation='zoomIn'
            iterationCount={1}
          >
            <ListOfSwiper />
          </Animatable.View>
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
