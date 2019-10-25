import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// Import icons
import iconMessage from '../../assets/images/img-icon-message.png'
import iconCommerce from '../../assets/images/img-icon-commerce.png'
import iconTransport from '../../assets/images/img-icon-transport.png'
import Picture from '../components/picture/Picture'

// Import theme
import { Theme } from '../constants/Theme'

const items = [
  {
    key: 1,
    icon: iconMessage,
    title: 'Mensajeria',
    routeName: 'Message'
  },
  {
    key: 2,
    icon: iconCommerce,
    title: 'Comercios',
    routeName: 'Commerce'
  },
  {
    key: 3,
    icon: iconTransport,
    title: 'Transporte',
    routeName: 'Transport'
  }
]

const ListOfServices = props => {
  return (
    <>
      <View style={styles.container}>
        {items.map(item => (
          <TouchableOpacity
            onPress={() => props.navigate(item.routeName)}
            key={item.key}
            style={styles.containerImage}
          >
            <Picture
              source={item.icon}
              styles={styles.image}
            />
            <View style={{ paddingVertical: 5 }} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerImage: {
    alignItems: 'center'
  },
  image: {
    height: 60,
    width: 60
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small
  }
})

export default ListOfServices
