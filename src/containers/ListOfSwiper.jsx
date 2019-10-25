import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import Swiper from 'react-native-swiper'

// Import image
import img1 from '../../assets/images/img-wallet.png'
import img2 from '../../assets/images/img-shopping.png'
import img3 from '../../assets/images/img-social.png'
import img4 from '../../assets/images/img-connections.png'
import img5 from '../../assets/images/img-cupon.png'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import Picture from '../components/picture/Picture'

const items = [
  {
    key: 1,
    img: img1
  },
  {
    key: 2,
    img: img2
  },
  {
    key: 3,
    img: img3
  },
  {
    key: 4,
    img: img4
  },
  {
    key: 5,
    img: img5
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
            source={item.img}
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
