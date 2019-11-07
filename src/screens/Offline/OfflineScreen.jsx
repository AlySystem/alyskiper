import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import Title from '../../components/title/Title'

// Import image
import logo from '../../../assets/images/img-alyskiper-error.png'

// Import theme
import { Theme } from '../../constants/Theme'

const OfflineScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <Picture
            source={logo}
          />
          <View style={{ paddingVertical: 10 }} />
          <Title
            title='Ooppss!'
            styles={styles.title}
          />
          <Text allowFontScaling={false} style={styles.description}>Revisa tu conexion a internet e intenta nuevamente.</Text>
        </View>
        <View style={styles.bottom}>
          <Text allowFontScaling={false} style={styles.description}>No podemos acceder a la red de Skiper</Text>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  layout: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: 16,
    textAlign: 'center'
  },
  bottom: {
    backgroundColor: 'red',
    width: '100%',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0
  }
})

export default OfflineScreen
