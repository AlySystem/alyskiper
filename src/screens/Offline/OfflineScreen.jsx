import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import NetInfo from '@react-native-community/netinfo'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import Title from '../../components/title/Title'
import IconButton from '../../components/button/IconButton'

// Import image
import logo from '../../../assets/images/img-alyskiper-error.png'

// Import theme
import { Theme } from '../../constants/Theme'

const OfflineScreen = props => {
  // console.log(props)
  const [isLoading, setIsLoading] = useState(false)

  const handleNetwordk = () => {
    setIsLoading(true)
    NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          // navigate('Home')
        }
      })
  }

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
          <Text style={styles.description}>Revisa tu conexion a internet e intenta nuevamente.</Text>
          <View style={styles.containerButton}>
            <IconButton
              stylesButton={styles.button}
              isActiveIcon
              iconName='rss-feed'
              message='REINTENTAR'
              isLoading={isLoading}
              onPress={handleNetwordk}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.description}>No podemos acceder a la red de Skiper</Text>
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
  },
  containerButton: {
    marginTop: 30
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 210,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
  }
})

export default OfflineScreen
