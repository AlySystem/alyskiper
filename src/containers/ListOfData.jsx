import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native'
import ViewPager from '@react-native-community/viewpager'

// Import components
import Picture from '../components/picture/Picture'
import Title from '../components/title/Title'

// Import theme
import { Theme } from '../constants/Theme'

// Import image
import image1 from '../../assets/images/img-swiper-1.png'
import image2 from '../../assets/images/img-swiper-2.png'
import image3 from '../../assets/images/img-swiper-3.png'

import logo from '../../assets/images/img-logo-skiper.png'

const { width, height } = Dimensions.get('window')

const items = [
  {
    key: 1,
    title: 'Cuenta conmigo',
    description: 'En Skiper podras dar usabilidad a tus criptomonedas.',
    image: image1
  },
  {
    key: 2,
    title: 'Viajando con Skiper',
    description: 'Puedes solicitar tu transporte a traves de la aplicacion acorde a tus necesidades.',
    image: image2
  },
  {
    key: 3,
    title: 'Gana con Skiper',
    description: 'Podrás ganar Alytochis al utilizar los servicios de AlySkiper, y Satochis cada vez que tus amigos referidos paguen con criptomonedas.',
    image: image3
  }
]

const ListOfData = props => {
  return (
    <ViewPager
      style={styles.viewPager}
    >
      {items.map(item => (
        <View
          style={styles.page}
          key={item.key}
        >
          <Picture
            source={logo}
            styles={styles.logo}
          />
          <View style={{ paddingVertical: 12 }} />
          <Picture
            source={item.image}
          />
          <Title
            title={item.title}
            styles={styles.title}
          />
          <Text allowFontScaling={false} style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </ViewPager>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  logo: {
    resizeMode: 'contain',
    width: width * 0.5,
    height: height * 0.15
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.subTitle
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  }
})

export default ListOfData
