import React, { useState } from 'react'
import {
  View,
  Dimensions,
  StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'

// Import components
import Background from '../../components/background/Background'
import Notification from '../../components/notification/Notification'
import Picture from '../../components/picture/Picture'
import IconButton from '../../components/button/IconButton'

// Import image
import logo from '../../../assets/images/launcher_icon.png'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const NotificationScreen = props => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Background>
      <View style={styles.screen}>
        <Notification
          onLongPress={() => setShowDetails(!showDetails)}
        />
        {/* {showDetails && (
          <View
            style={styles.containerScreen}
            onTouchStart={() => {
              setShowDetails(!showDetails)
            }}
          >
            <View style={styles.content} />
            <Animatable.View
              duration={500}
              animation='fadeInUp'
              iterationCount={1}
              style={styles.container}
            >
              <Picture
                source={logo}
                styles={styles.image}
              />
              <View style={{ paddingVertical: 5 }} />
              <Text style={styles.subTitle}>Tele pizza</Text>
              <View style={{ paddingVertical: 2 }} />
              <Text style={styles.description}>Su pizza fue aceptada.</Text>
              <View style={styles.containerButton}>
                <IconButton
                  isActiveIcon
                  message='Eliminar esta notificacion'
                  iconName='close'
                  stylesButton={styles.button}
                />
              </View>
            </Animatable.View>
          </View>
        )} */}
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  containerScreen: {
    height: height,
    width: '100%'
  },
  subTitle: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal
  },
  description: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.small
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 100
  },
  containerButton: {
    alignSelf: 'flex-start',
    marginVertical: 10
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 57,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 250
  }
})

export default NotificationScreen
