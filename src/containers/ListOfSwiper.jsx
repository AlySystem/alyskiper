import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import Swiper from 'react-native-swiper'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import { LazyImage } from '../components/lazy/LazyImage'

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
          <LazyImage
            styleLazyImage={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover'
            }}
            sourceLazy={require('../../assets/images/img-lazy.png')}
            source={{ uri: item.img }}
            styleImage={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover'
            }}
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
  opacity: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
})

export default ListOfSwiper
