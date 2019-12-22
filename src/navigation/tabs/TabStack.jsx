import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'

// Import screen
import HistoryScreen from '../../screens/Commerce/HistoryScreen'
import CategoriesScreen from '../../screens/Commerce/CategoriesScreen'

// Import components
import Icon from '../../components/icon/Icon'
import Picture from '../../components/picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const TabStacks = createBottomTabNavigator({
  CommerceCategories: {
    screen: CategoriesScreen,
    navigationOptions: {
      title: 'Categorias',
      tabBarIcon: <Picture source={require('../../../assets/images/img-alyskiper.png')} styles={{
        width: 25,
        height: 25,
        resizeMode: 'contain'
      }} />
    }
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      title: 'Historial',
      tabBarIcon: <Icon iconName='history' iconSize={25} iconColor={Theme.COLORS.colorSecondary} />,
    }
  }
}, {
  initialRouteName: 'CommerceCategories',
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'Lato-Regular',
      fontSize: 13
    },
    activeTintColor: Theme.COLORS.colorSecondary,
    inactiveTintColor: Theme.COLORS.colorParagraph,
    showIcon: true,
    tabStyle: {
      backgroundColor: Theme.COLORS.colorMainAlt
    }
  }
})

export default TabStacks
