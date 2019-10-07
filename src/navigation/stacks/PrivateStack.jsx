import { createStackNavigator } from 'react-navigation-stack'

// Import drawer
import DrawerStack from '../drawer/DrawerStack'

// Import screens
import CommerceScreen from '../../screens/Commerce/CommerceScreen'

const StackNavigation = createStackNavigator({
  Home: {
    screen: DrawerStack
  },
  Commerce: {
    screen: CommerceScreen
  }
}, {

})

export default StackNavigation
