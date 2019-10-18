import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import { withNavigation } from 'react-navigation'

// Import components
import Item from '../components/item/Item'

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
    routeName: 'InvitedFriend'
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
    navigate('Startup', { message: 'Saliendo...' })
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerFixed}>
        {items.map(item => (
          <Item
            key={item.key}
            routeName={item.routeName}
            name={item.name}
            icon={item.icon}
            onPress={() => navigate(item.routeName)}
          />
        ))}
        <View style={styles.containerItems}>
          <Item
            onPress={handleLogout}
            name='Cerrar sesion'
            icon='reply-all'
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative'
  },
  containerItems: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  containerFixed: {
    flex: 1,
    position: 'relative'
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
