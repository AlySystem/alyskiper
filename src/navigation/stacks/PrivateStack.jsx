import React from 'react'
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

// Import drawer
import DrawerStack from '../drawer/DrawerStack'

// Import screens
import CommerceScreen from '../../screens/Commerce/CommerceScreen'
import ProfileCommerceScreen from '../../screens/Profile/ProfileCommerceScreen'
import TransportScreen from '../../screens/Transport/TransportScreen'
import InvitedFriendScreen from '../../screens/InvitedFriend/InvitedFriendScreen'
import ProfileUserScreen from '../../screens/Profile/ProfileUserScreen'
import PaymentMethodScreen from '../../screens/PaymentMethod/PaymentMethodScreen'
import CryptoWalletScreen from '../../screens/CryptoWallet/CryptoWalletScreen'
import ProductScreen from '../../screens/Product/ProductScreen'

// Import components
import Picture from '../../components/picture/Picture'
import Icon from '../../components/icon/Icon'

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
    screen: DrawerStack,
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          backgroundColor: Theme.COLORS.colorMainAlt
        },
        headerLeft: (
          <Picture
            source={logo}
            styles={styles.image}
          />
        ),
        headerRight: (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.icon}
          >
            <Icon
              iconName='menu'
              iconSize={30}
            />
          </TouchableOpacity>
        )
      }
    }
  },
  ProfileUser: {
    screen: ProfileUserScreen,
    navigationOptions
  },
  CryptoWallet: {
    screen: CryptoWalletScreen,
    navigationOptions
  },
  PaymentMethod: {
    screen: PaymentMethodScreen,
    navigationOptions
  },
  Product: {
    screen: ProductScreen,
    navigationOptions
  },
  InvitedFriend: {
    screen: InvitedFriendScreen,
    navigationOptions
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
  // initialRouteName: 'InvitedFriend'
})

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    width: 130,
    height: 40,
    marginHorizontal: 10
  },
  image: {
    resizeMode: 'contain',
    width: 130,
    height: 40,
    marginHorizontal: 10
  },
  icon: {
    paddingHorizontal: 10,
    paddingVertical: 5
  }
})

export default StackNavigation
