import React from 'react'
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native'

import { withNavigation } from 'react-navigation'

// Import components
import Item from '../components/item/Item'
// import Profile from '../components/Profile/Profile'
import Icon from '../components/icon/Icon'

// Import theme
import { Theme } from '../constants/Theme'

// Import utils
import { removeAsyncStorage } from '../utils/AsyncStorage'
import { keys } from '../utils/keys'

const items = [
  {
    key: 1,
    name: 'Inicio',
    icon: 'home',
    routeName: 'Home'
  },
  {
    key: 2,
    name: 'Metodo de pago',
    icon: 'credit-card',
    routeName: 'MethodPayment'
  },
  {
    key: 3,
    name: 'AlyMoney',
    icon: '',
    routeName: 'AlyMoney'
  },
  {
    key: 4,
    name: 'Invitar amigos',
    icon: 'card-giftcard',
    routeName: 'Invited'
  },
  {
    key: 5,
    name: 'Soporte',
    icon: 'verified-user',
    routeName: 'Support'
  },
  {
    key: 6,
    name: 'Legal',
    icon: 'security',
    routeName: 'Legal'
  }
]

const ListOfItems = (props) => {
  const { navigate } = props.navigation

  const handleLogout = async () => {
    await removeAsyncStorage(keys.asyncStorageKey)
    navigate('Loader', { message: 'Saliendo...' })
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        {/* <Profile onPress={() => navigate('EditAccount')} /> */}
        <View style={{ paddingVertical: 10 }} />
        {items.map(item => (
          <Item
            key={item.key}
            routeName={item.routeName}
            name={item.name}
            icon={item.icon}
          />
        ))}

        <TouchableOpacity
          onPress={handleLogout}
          style={styles.containerItem}
        >
          <View style={styles.left}>
            <Icon
              iconName='reply-all'
              iconSize={28}
              styles={styles.icon}
            />
            <View style={styles.content}>
              <Text style={styles.name}>Cerrar sesion</Text>
            </View>
          </View>
          <Icon
            iconName='chevron-right'
            iconSize={30}
          />
        </TouchableOpacity>

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 20
  },
  name: {
    fontFamily: 'Lato-Regular',
    color: '#fff',
    fontSize: Theme.SIZES.small
  }
})

export default withNavigation(ListOfItems)
