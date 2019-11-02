import React from 'react'
import {
  StyleSheet,
  Dimensions,
  Text
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import ViewPager from '@react-native-community/viewpager'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'

// Import actions types
import { SERVICES } from '../store/actionTypes'

// Import querys
import { CATEGORYTRAVEL } from '../graphql/querys/Querys'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import CategoryServices from '../components/category/CategoryServices'

// Import skeleton
import SkeletonServices from '../skeleton/SkeletonServices'

const { height } = Dimensions.get('window')

const ListOfCategoryServices = props => {
  const { navigate } = props.navigation
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user)
  const { data, loading } = useQuery(CATEGORYTRAVEL)

  if (loading) {
    return (
      <Animatable.View
        animation='fadeInUp'
        iterationCount={1}
        style={styles.container}
      >
        <SkeletonServices />
      </Animatable.View>
    )
  }

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
        {data.skipercattravels.filter(item => item.id < 5).map(category => (
          <CategoryServices
            onPress={() => navigate('DetailsTransport', {
              steps: props.steps,
              id: category.id,
              category: category.name
            })}
            key={category.id}
            source={{ uri: category.url_img_category }}
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
