import { createStackNavigator } from 'react-navigation-stack'

// Import screen
import SignInScreen from '../../screens/SignIn/SignInScreen'

// Import theme
import { Theme } from '../../constants/Theme'

const PublicStack = createStackNavigator({
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
