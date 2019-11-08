import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Background from '../../components/background/Background'

const GainScreen = props => {
  return (
    <Background
      source={require('../../../assets/images/img-background-alyskiper.png')}
    >
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.description} allowFontScaling={false}>Aqui puedes ver tus ganancias generadas por la aplicacion.</Text>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.4)'
  },
  container: {
    paddingHorizontal: 20,
    marginVertical: 20
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  }
})

export default GainScreen
