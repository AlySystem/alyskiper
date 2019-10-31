import {
  Dimensions
} from 'react-native'
import { createDrawerNavigator } from 'react-navigation-drawer'

// Import theme
import { Theme } from '../../constants/Theme'

// Import screen
import HomeScreen from '../../screens/Home/HomeScreen'

// Import containers
import ListOfItems from '../../containers/ListOfItems'

const { width } = Dimensions.get('window')

const DrawerStack = createDrawerNavigator({
  HomeDrawer: {
    screen: HomeScreen
  }
}, {
  contentComponent: ListOfItems,
  drawerBackgroundColor: Theme.COLORS.colorMainAlt,
  drawerWidth: width * 0.9,
  drawerType: 'back'
})

export default DrawerStack
