import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const FinalTravelScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>El viaje a finalizado.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    flex: 1
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.subTitle
  }
})

export default FinalTravelScreen
