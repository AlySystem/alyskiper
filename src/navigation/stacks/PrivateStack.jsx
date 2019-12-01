import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { createStackNavigator } from 'react-navigation-stack'

// Import drawer
import DrawerStack from '../drawer/DrawerStack'

// Import screens
import CommerceScreen from '../../screens/Commerce/CommerceScreen'
import ProfileCommerceScreen from '../../screens/Profile/ProfileCommerceScreen'

import TransportScreen from '../../screens/Transport/TransportScreen'
import RequestScreen from '../../screens/Transport/RequestScreen'
import TravelTrancingScreen from '../../screens/Transport/TravelTracingScreen'

import InvitedFriendScreen from '../../screens/InvitedFriend/InvitedFriendScreen'
import ProfileUserScreen from '../../screens/Profile/ProfileUserScreen'
import PaymentMethodScreen from '../../screens/PaymentMethod/PaymentMethodScreen'
import CryptoWalletScreen from '../../screens/CryptoWallet/CryptoWalletScreen'
import ProductScreen from '../../screens/Product/ProductScreen'
import AddressScreen from '../../screens/Address/AddressScreen'
import NotificationScreen from '../../screens/Notification/NotificationScreen'
import AlyMoneyScreen from '../../screens/AlyMoney/AlyMoneyScreen'
import ScannerScreen from '../../screens/Scanner/ScannerScreen'
import AddAddressScreen from '../../screens/Address/AddAddressScreen'
import MapAddressScreen from '../../screens/Address/MapAddressScreen'
import CreditCardScreen from '../../screens/CreditCard/CreditCardScreen'
import BillTransport from '../../screens/Transport/BillTransportScreen'
import PickerTransportScreen from '../../screens/Transport/PickerTransportScreen'

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
          <Animatable.View
            animation='bounce'
            iterationCount={1}
          >
            <Picture
              source={logo}
              styles={styles.image}
            />
          </Animatable.View>
        ),
        headerRight: (
          <View style={{
            flexDirection: 'row'
          }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('TravelTrancing')}
              style={styles.icon}
            >
              <Icon
                iconName='local-taxi'
                iconSize={30}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={styles.icon}
            >
              <Icon
                iconName='menu'
                iconSize={30}
              />
            </TouchableOpacity>
          </View>
        )
      }
    }
  },
  ProfileUser: {
    screen: ProfileUserScreen,
    navigationOptions
  },
  Address: {
    screen: AddressScreen,
    navigationOptions
  },
  CryptoWallet: {
    screen: CryptoWalletScreen,
    navigationOptions
  },
  Notification: {
    screen: NotificationScreen,
    navigationOptions
  },
  AlyMoney: {
    screen: AlyMoneyScreen,
    navigationOptions
  },
  PaymentMethod: {
    screen: PaymentMethodScreen,
    navigationOptions
  },
  CreditCard: {
    screen: CreditCardScreen,
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
    navigationOptions: {
      header: null
    }
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
  },
  Request: {
    screen: RequestScreen,
    navigationOptions: {
      header: null
    }
  },
  Scanner: {
    screen: ScannerScreen,
    navigationOptions
  },
  TravelTrancing: {
    screen: TravelTrancingScreen,
    navigationOptions: {
      header: null
    }
  },
  AddAddress: {
    screen: AddAddressScreen,
    navigationOptions
  },
  MapAddress: {
    screen: MapAddressScreen,
    navigationOptions: {
      header: null
    }
  },
  BillTransport: {
    screen: BillTransport,
    navigationOptions
  },
  pickerTransport: {
    screen: PickerTransportScreen,
    navigationOptions: {
      header: null
    }
  }
})

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    width: 130,
    height: 35,
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
