import { createStackNavigator } from 'react-navigation-stack'

// Import screen
import SignInScreen from '../../screens/SignIn/SignInScreen'

const PublicStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen
  }
}, {

})

export default PublicStack
