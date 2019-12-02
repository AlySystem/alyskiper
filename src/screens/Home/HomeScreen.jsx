import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

// Import actions types
import { REMOVEDIRECTION, REMOVEDETAILSTRAVEL, REMOVELOCATION, REMOVEACTIVETRAVEL } from '../../store/actionTypes'

// Import theme
import { Theme } from '../../constants/Theme'

// Import containers
import ListOfSwiper from '../../containers/ListOfSwiper'
import ListOfBanner from '../../containers/ListOfBanner'
import ListOfServices from '../../containers/ListOfServices'

// Import components
import Background from '../../components/background/Background'

const HomeScreen = props => {
  const dispatch = useDispatch()
  const remove = props.navigation.getParam('remove', false)
  const { navigate } = props.navigation
  const userData = useSelector(state => state.user)

  useEffect(() => {
    if (remove) {
      dispatch({
        type: REMOVEDIRECTION
      })
      dispatch({
        type: REMOVEDETAILSTRAVEL
      })
      dispatch({
        type: REMOVELOCATION
      })
      dispatch({
        type: REMOVEACTIVETRAVEL
      })
    }
  }, [remove])

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <ListOfBanner />

          <View style={{ paddingVertical: 10 }} />
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.title}>Bienvenido, {userData.firstName}!</Text>
            <View style={{ paddingVertical: 2 }} />
            <Text allowFontScaling={false} style={styles.description}>Cuenta conmigo.</Text>
            <View style={{ paddingVertical: 15 }} />
            <ListOfServices
              navigate={navigate}
            />
          </View>
          <View style={{ paddingVertical: 20 }} />

          <ListOfSwiper />

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
