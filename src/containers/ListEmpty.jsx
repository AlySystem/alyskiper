import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import components
import Picture from '../components/picture/Picture'

// Import theme
import { Theme } from '../constants/Theme'

const ListEmpty = () => {
  return (
    <View style={styles.container}>
      <Picture
        source={require('../../assets/images/img-alyskiper-error.png')}
      />
      <View style={{ paddingVertical: 15 }} />
      <Text style={styles.title}>PROXIMAMENTE</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.title
  }
})

export default ListEmpty
