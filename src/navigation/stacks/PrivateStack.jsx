import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { createStackNavigator } from 'react-navigation-stack'
import { useSelector } from 'react-redux'

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
import AddressScreen from '../../screens/Address/AddressScreen'
import NotificationScreen from '../../screens/Notification/NotificationScreen'
import OfflineScreen from '../../screens/Offline/OfflineScreen'
import AlyMoneyScreen from '../../screens/AlyMoney/AlyMoneyScreen'
import DetailsTransportScreen from '../../screens/Transport/DetailsTransportScreen'
import FixedMapScreen from '../../screens/FixedMap/FixedMapScreen'
import ScannerScreen from '../../screens/Scanner/ScannerScreen'
import TravelTrancingScreen from '../../screens/Transport/TravelTracingScreen'
import AddAddressScreen from '../../screens/Address/AddAddressScreen'
import MapAddressScreen from '../../screens/Address/MapAddressScreen'
import CreditCardScreen from '../../screens/CreditCard/CreditCardScreen'
// import FinalTravelScreen from '../../screens/Transport/FinalTravelScreen'

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
  DetailsTransport: {
    screen: DetailsTransportScreen,
    navigationOptions
  },
  FixedMap: {
    screen: FixedMapScreen,
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
  Offline: {
    screen: OfflineScreen,
    navigationOptions: {
      header: null
    }
  }
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
