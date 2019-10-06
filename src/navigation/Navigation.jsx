import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

// Import screens
import HomeScreen from '../screens/Home/HomeScreen'
import SignInScreen from '../screens/SignIn/SignInScreen'

const STACKS = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  SignIn: {
    screen: SignInScreen
  }
})

export default createAppContainer(STACKS)
