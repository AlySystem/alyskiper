import React from 'react'
import {
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native'
import * as Animatable from 'react-native-animatable'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import Title from '../components/title/Title'
import CategoryServices from '../components/category/CategoryServices'

// Import images
import image1 from '../../assets/images/img-category-1.png'
import image2 from '../../assets/images/img-category-2.png'
import image3 from '../../assets/images/img-category-3.png'
import image4 from '../../assets/images/img-category-4.png'

const { height } = Dimensions.get('window')

const items = [
  {
    key: 1,
    img: image1
  },
  {
    key: 2,
    img: image2
  },
  {
    key: 3,
    img: image3
  },
  {
    key: 4,
    img: image4
  }
]

const ListOfCategoryServices = props => {
  return (
    <Animatable.View
      animation='fadeInUp'
      iterationCount={1}
      style={styles.container}
    >
      <Title
        title='Elige tu categoria'
        styles={styles.title}
      />
      <ScrollView
        horizontal
        keyboardShouldPersistTaps='always'
        pagingEnabled
        scrollIndicatorInsets={{ top: 10, left: 10, bottom: 10, right: 10, color: 'red' }}
      >
        {items.map(item => (
          <CategoryServices
            key={item.key}
            source={item.img}
          />
        ))}
      </ScrollView>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: height * 0.4
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal
  }
})

export default ListOfCategoryServices
