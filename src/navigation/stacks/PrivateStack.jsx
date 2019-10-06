import { createStackNavigator } from 'react-navigation-stack'

// Import drawer
import DrawerStack from '../drawer/DrawerStack'

// Import screens

const StackNavigation = createStackNavigator({
  Home: {
    screen: DrawerStack
  }
}, {

})

export default StackNavigation
