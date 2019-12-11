import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

// Import screen
import HistoryScreen from '../../screens/Tabs/HistoryScreen'
import CategoryScreen from '../../screens/Tabs/CategoryScreen'

const TabStacks = createBottomTabNavigator({
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      title: 'Historial'
    }
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: {
      title: 'Categorias'
    }
  }
}, {

})

export default TabStacks
