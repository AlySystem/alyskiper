import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import Title from '../../components/title/Title'
import Loader from '../../components/loader/Loader'

// Import theme
import { Theme } from '../../constants/Theme'

const LoaderScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.container}>
          <Picture />
          <View style={{ paddingVertical: 5 }} />
          <Loader />
          <Title
            title='Cargando...'
            styles={styles.title}
          />
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold',
    textAlign: 'center'
  }
})

export default LoaderScreen
