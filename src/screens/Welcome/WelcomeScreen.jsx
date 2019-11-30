import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'

// Import containers
import ListOfData from '../../containers/ListOfData'

// Import theme
import { Theme } from '../../constants/Theme'

import Snow from '../../components/snow/Snow'

const WelcomeScreen = props => {
  const { navigate } = props.navigation

  return (
    <Background>
      <Snow />
      <View style={styles.screen}>
        <View style={styles.container}>
          <ListOfData />
          <View style={styles.containerButtons}>
            <IconButton
              message='INICIAR SESION'
              isActiveIcon
              stylesButton={styles.buttonAlt}
              iconName='person'
              onPress={() => navigate('SignIn')}
            />
            <IconButton
              message='REGISTRARSE'
              isActiveIcon
              stylesButton={styles.button}
              iconName='person-add'
              onPress={() => navigate('SignUp')}
            />
          </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerButtons: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row'
  },
  button: {
    paddingHorizontal: 20,
    height: 57,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
  },
  buttonAlt: {
    paddingHorizontal: 20,
    height: 57,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3,
    borderRightColor: Theme.COLORS.colorSecondary,
    borderRightWidth: 0.3
  }
})

export default WelcomeScreen
