import React from 'react'
import {
  StyleSheet
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

// Import screen
import WelcomeScreen from '../../screens/Welcome/WelcomeScreen'
import SignInScreen from '../../screens/SignIn/SignInScreen'
import SignUpScreen from '../../screens/SignUp/SignUpScreen'
import SendPhoneScreen from '../../screens/SendPhone/SendPhoneScreen'
import VerifyPhoneScreen from '../../screens/VerifyPhone/VerifyPhoneScreen'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Picture from '../../components/picture/Picture'

// Import images
import logo from '../../../assets/images/logo.png'

const navigationOptions = ({ navigation }) => {
  return {
    headerTintColor: Theme.COLORS.colorSecondary,
    headerStyle: {
      backgroundColor: Theme.COLORS.colorMainDark
    },
    headerRight: (
      <Picture
        source={logo}
        styles={styles.image}
      />
    )
  }
}

const PublicStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: Theme.COLORS.colorSecondary
    }
  },
  SendPhone: {
    screen: SendPhoneScreen,
    navigationOptions: ({ navigation }) => {
      return {
        header: null
      }
    }
  },
  VerifyPhone: {
    screen: VerifyPhoneScreen,
    navigationOptions
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions
  }
// }, { initialRouteName: 'SignUp' })
})

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: 130,
    height: 40,
    marginHorizontal: 20
  }
})

export default PublicStack
