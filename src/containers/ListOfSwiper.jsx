import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import Swiper from 'react-native-swiper'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import Picture from '../components/picture/Picture'

const items = [
  {
    key: 1,
    img: 'https://storage.googleapis.com/app_user_bucket/img-wallet.png'
  },
  {
    key: 2,
    img: 'https://storage.googleapis.com/app_user_bucket/img-social.png'
  },
  {
    key: 3,
    img: 'https://storage.googleapis.com/app_user_bucket/img-shopping.png'
  },
  {
    key: 4,
    img: 'https://storage.googleapis.com/app_user_bucket/img-cupon.png'
  },
  {
    key: 5,
    img: 'https://storage.googleapis.com/app_user_bucket/img-connections.png'
  }
]

const ListOfSwiper = props => {
  return (
    <Swiper
      autoplay
      height={230}
      dotColor={Theme.COLORS.colorMainAlt}
      activeDotColor={Theme.COLORS.colorSecondary}
    >
      {items.map(item => (
        <View
          key={item.key}
        >
          <Picture
            styles={styles.image}
            source={{ uri: item.img }}
          />
          <View
            style={styles.opacity}
          />
        </View>
      ))}
    </Swiper>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  opacity: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})

export default ListOfSwiper
