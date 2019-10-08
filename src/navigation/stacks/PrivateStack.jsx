import React from 'react'
import {
  StyleSheet
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

// Import drawer
import DrawerStack from '../drawer/DrawerStack'

// Import screens
import CommerceScreen from '../../screens/Commerce/CommerceScreen'
import ProfileCommerceScreen from '../../screens/Profile/ProfileCommerceScreen'
import TransportScreen from '../../screens/Transport/TransportScreen'

// Import components
import Picture from '../../components/picture/Picture'

// Import image
import logo from '../../../assets/images/logo.png'

// Import theme
import { Theme } from '../../constants/Theme'

const navigationOptions = ({ navigation }) => {
  return {
    headerTintColor: Theme.COLORS.colorSecondary,
    headerStyle: {
      backgroundColor: Theme.COLORS.colorMainAlt
    },
    headerRight: (
      <Picture
        source={logo}
        styles={styles.logo}
      />
    )
  }
}

const StackNavigation = createStackNavigator({
  Home: {
    screen: DrawerStack
  },
  Commerce: {
    screen: CommerceScreen,
    navigationOptions
  },
  ProfileCommerce: {
    screen: ProfileCommerceScreen,
    navigationOptions
  },
  Transport: {
    screen: TransportScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Transport'
})

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    width: 130,
    height: 40,
    marginHorizontal: 10
  }
})

export default StackNavigation
