import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import Swiper from 'react-native-web-swiper'

// Import components
import Picture from '../components/picture/Picture'

// Import image
import image1 from '../../assets/images/img-swiper-1.png'
import image2 from '../../assets/images/img-swiper-2.png'
import image3 from '../../assets/images/img-swiper-3.png'

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
    description: 'Con Skiper podras ganar Alytochi al viajar con nosotros y satochi al pagar la aplicacion con tus amigos',
    image: image3
  }
]

const ListOfData = props => {
  return (
    <Swiper>
      {items.map(item => (
        <View key={item.key}>
          <Picture
            source={item.image}
          />
        </View>
      ))}
    </Swiper>
  )
}

const styles = StyleSheet.create({

})

export default ListOfData
