import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'

// Actions types
import { USERREMOVEDATA } from '../store/actionTypes'

// Import components
import Item from '../components/item/Item'
import Profile from '../components/profile/Profile'

// Import utils
import { removeAsyncStorage } from '../utils/AsyncStorage'
import { keys } from '../utils/keys'

// Import theme
import { Theme } from '../constants/Theme'

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
    routeName: 'PaymentMethod'
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

  const dispatch = useDispatch()
  const userData = useSelector(state => state.user)

  const handleLogout = () => {
    navigate('Startup', { message: 'Saliendo...' })
    dispatch({
      type: USERREMOVEDATA
    })
    removeAsyncStorage(keys.asyncStorageKey)
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerFixed}>
        <Profile
          avatarInitial={!userData.avatar ? `${userData.firstName[0]}${userData.lastName[0]}` : null}
          sourceImage={userData.avatar ? userData.avatar : null}
          username={userData.userName}
          email={userData.email}
          onPress={() => navigate('ProfileUser')}
        />
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
