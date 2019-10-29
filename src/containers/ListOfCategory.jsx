import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'

// Import components
import Category from '../components/category/Category'
import Title from '../components/title/Title'

// Import query
import { CATEGORY } from '../graphql/querys/Querys'

// Import theme
import { Theme } from '../constants/Theme'

// Import skeleton
import SkeletonCategory from '../skeleton/SkeletonCategory'

const ListOfCategory = props => {
  const { data, loading } = useQuery(CATEGORY)

  return (
    <>
      {loading ? (
        <SkeletonCategory />
      ) : (
        <View style={styles.container}>
          <Title
            title='Categorias'
            styles={styles.title}
          />

          <ScrollView
            horizontal
            keyboardShouldPersistTaps='always'
          >
            {data.getAllSkiperSubCatCommerce.map(category => (
              <Category
                key={category.id}
                title={category.name}
                source={{ uri: category.url_img }}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.title,
    fontFamily: 'Lato-Bold'
  }
})

export default ListOfCategory
