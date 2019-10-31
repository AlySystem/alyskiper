import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'

// Import components
import Picture from '../picture/Picture'
import Button from '../button/Button'

// Import image
import logo from '../../../assets/images/logo.png'

// Import theme
import { Theme } from '../../constants/Theme'

const ToolBar = props => {
  const { navigate } = props.navigation

  return (
    <>
      <View
        style={styles.container}
      >
        <Button
          iconName='arrow-back'
          iconSize={25}
          onPress={() => props.navigation.goBack()}
        />

        <Animatable.View
          style={styles.containerNotification}
          animation='fadeInDown'
          iterationCount={1}
        >
          <Picture
            source={logo}
            styles={styles.image}
          />
          <Button
            iconName='notifications'
            iconSize={25}
            onPress={() => navigate('Notification')}
          />
          <View style={styles.notification}>
            <Text allowFontScaling={false} style={styles.notificationValue}>7</Text>
          </View>
        </Animatable.View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: Theme.COLORS.colorMainAlt,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderRadius: 200,
    position: 'relative'
  },
  containerNotification: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center'
  },
  notification: {
    backgroundColor: 'red',
    position: 'absolute',
    right: -5,
    top: 8,
    borderRadius: 100,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4
  },
  notificationValue: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold'
  },
  image: {
    resizeMode: 'contain',
    width: 130,
    height: 40,
    marginRight: 10
  }
})

export default ToolBar
