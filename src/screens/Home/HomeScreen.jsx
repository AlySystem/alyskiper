import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'

// Import theme
import { Theme } from '../../constants/Theme'

// Import containers
import ListOfSwiper from '../../containers/ListOfSwiper'
import ListOfBanner from '../../containers/ListOfBanner'
import ListOfServices from '../../containers/ListOfServices'

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

          <View style={{ paddingVertical: 10 }} />
          <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, {userData.firstName}!</Text>
            <View style={{ paddingVertical: 2 }} />
            <Text style={styles.description}>Cuenta conmigo.</Text>
            <View style={{ paddingVertical: 15 }} />
            <ListOfServices
              navigate={navigate}
            />
          </View>
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
  },
  container: {
    paddingHorizontal: 10
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.title,
    fontFamily: 'Lato-Regular'
  },
  description: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.small,
    fontFamily: 'Lato-Regular'
  }
})

export default HomeScreen
