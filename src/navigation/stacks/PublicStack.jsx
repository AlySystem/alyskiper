import { createStackNavigator } from 'react-navigation-stack'

// Import screen
import WelcomeScreen from '../../screens/Welcome/WelcomeScreen'
import SignInScreen from '../../screens/SignIn/SignInScreen'

// Import theme
import { Theme } from '../../constants/Theme'

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
  }
}, {

})

export default PublicStack
