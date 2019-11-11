import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import GPSState from 'react-native-gps-state'

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
  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <Picture
            source={logo}
          />
          <View style={{ paddingVertical: 10 }} />
          <Title
            title={props.title}
            styles={styles.title}
          />
          <Text allowFontScaling={false} style={styles.description}>{props.description}</Text>

          {props.isGps && (
            <View style={{
              marginVertical: 25
            }}
            >
              <IconButton
                message='ACTIVAR GPS'
                isActiveIcon
                iconName='location-on'
                onPress={() => GPSState.openLocationSettings()}
              />
            </View>
          )}
        </View>
        {props.isOnline && (
          <View style={styles.bottom}>
            <Text allowFontScaling={false} style={styles.description}>No podemos acceder a la red de Skiper</Text>
          </View>
        )}
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
