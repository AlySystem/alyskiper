import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const CreditCardScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.container}>
          <Picture
            source={require('../../../assets/images/img-alyskiper.png')}
          />
          <View style={{ marginVertical: 10 }} />
          <Text style={styles.title} allowFontScaling={false}>PROXIMAMENTE PODRAS REGISTRAR TU TARJETAS BANCARIAS.</Text>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  }
})

export default CreditCardScreen
