import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView
} from 'react-native'

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
    description: 'Con Skiper podras ganar Alytochi al viajar con nosotros y satochi al pagar la aplicacion con tus amigos.',
    image: image3
  }
]

const ListOfData = props => {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      scrollIndicatorInsets={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      {items.map(item => (
        <View
          style={styles.swiper}
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
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue'
  },
  scrollView: {

  },
  swiper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: width
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
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  }
})

export default ListOfData
