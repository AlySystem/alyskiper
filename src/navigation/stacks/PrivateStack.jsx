import { createStackNavigator } from 'react-navigation-stack'

// Import drawer
import DrawerStack from '../drawer/DrawerStack'

// Import screens
import CommerceScreen from '../../screens/Commerce/CommerceScreen'
import ProfileCommerceScreen from '../../screens/Profile/ProfileCommerceScreen'

const StackNavigation = createStackNavigator({
  Home: {
    screen: DrawerStack
  },
  Commerce: {
    screen: CommerceScreen
  },
  ProfileCommerce: {
    screen: ProfileCommerceScreen
  }
}, {

})

export default StackNavigation
