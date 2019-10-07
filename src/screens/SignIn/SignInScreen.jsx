import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import Title from '../../components/title/Title'

// Import theme
import { Theme } from '../../constants/Theme'

const HomeScreen = () => {
  return (
    <Background>
      <View style={styles.screen}>
        <Picture />
        <Title
          title='SING IN'
          styles={styles.title}
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  title: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.title
  }
})

export default HomeScreen
