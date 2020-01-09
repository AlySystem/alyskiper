import React from 'react'
import {
  StyleSheet,
  View,
  Linking
} from 'react-native'

import { withNavigation } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'

// Actions types
import { USERREMOVEDATA } from '../store/actionTypes'

// Import components
import Item from '../components/item/Item'
import Profile from '../components/profile/Profile'
import Background from '../components/background/Background'

// Import utils
import { removeAsyncStorage } from '../utils/AsyncStorage'
import { keys } from '../utils/keys'

// Import theme
import { Theme } from '../constants/Theme'

const items = [
  {
    name: 'Metodo de pago',
    icon: 'credit-card',
    routeName: 'PaymentMethod'
  },
  {
    name: 'AlyPay',
    icon: '',
    routeName: 'AlyPay'
  },
  {
    name: 'Invitar amigos',
    icon: 'card-giftcard',
    routeName: 'InvitedFriend'
  },
  {
    name: 'Soporte',
    icon: 'verified-user',
    routeName: 'Support',
    action: () => Linking.openURL('whatsapp://send?phone=+50660727720')
  },
  {
    name: 'Politicas de Privacidad',
    icon: 'security',
    routeName: 'Legal',
    action: () => Linking.openURL('https://alyskiper.com/politicas')
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
    <Background source={require('../../assets/images/img-background-alyskiper.png')}>
      <View style={styles.container}>
        <View style={styles.containerFixed}>
          <Profile
            avatarInitial={!userData.avatar ? `${userData.firstName[0]}${userData.lastName[0]}` : null}
            sourceImage={userData.avatar ? userData.avatar : null}
            username={userData.userName}
            email={userData.email}
            onPress={() => navigate('ProfileUser')}
          />
          {items.map((item, key) => (
            <Item
              key={key}
              routeName={item.routeName}
              name={item.name}
              icon={item.icon}
              onPress={() => {
                if (item.action) {
                  item.action()
                } else {
                  navigate(item.routeName)
                }
              }}
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
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,.45)'
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
