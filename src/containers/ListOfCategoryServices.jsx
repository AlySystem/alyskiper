import React from 'react'
import {
  StyleSheet,
  Dimensions,
  Text
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import ViewPager from '@react-native-community/viewpager'
import { useSelector } from 'react-redux'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import CategoryServices from '../components/category/CategoryServices'

// Import images
import image1 from '../../assets/images/img-category-3.png'
import image2 from '../../assets/images/img-category-4.png'
import image3 from '../../assets/images/img-category-1.png'
import image4 from '../../assets/images/img-category-2.png'

const { height } = Dimensions.get('window')

const items = [
  {
    key: 1,
    img: image1,
    category: 'Silver'
  },
  {
    key: 2,
    img: image2,
    category: 'Golden'
  },
  {
    key: 3,
    img: image3,
    category: 'Vip'
  },
  {
    key: 4,
    img: image4,
    category: 'President'
  }
]

const ListOfCategoryServices = props => {
  const { navigate } = props.navigation
  const userData = useSelector(state => state.user)

  return (
    <Animatable.View
      animation='fadeInUp'
      iterationCount={1}
      style={styles.container}
    >

      <Text allowFontScaling={false} style={styles.title}>Hola {userData.firstName.toLowerCase()}, selecciona una de nuestras categorias.</Text>
      <ViewPager
        style={styles.viewPager}
      >
        {items.map(item => (
          <CategoryServices
            onPress={() => navigate('DetailsTransport', {
              steps: props.steps,
              id: item.key,
              category: item.category
            })}
            key={item.key}
            source={item.img}
          />
        ))}
      </ViewPager>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: height * 0.3,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  }
})

export default ListOfCategoryServices
