import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'

// Import components
import Category from '../components/category/Category'
import Title from '../components/title/Title'

// Import theme
import { Theme } from '../constants/Theme'

const items = [
  {
    key: 1,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20cafe.png'
  },
  {
    key: 2,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20carnes.png'
  },
  {
    key: 3,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20italiana.png'
  },
  {
    key: 4,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20vegetariana.png'
  },
  {
    key: 5,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20sabor%20Nica.png'
  },
  {
    key: 6,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20pizzas.png'
  },
  {
    key: 7,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20mexicana.png'
  },
  {
    key: 8,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20mediterranea.png'
  },
  {
    key: 9,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20mariscos.png'
  },
  {
    key: 10,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20mediterranea.png'
  },
  {
    key: 11,
    img: 'https://storage.googleapis.com/app_user_bucket/500X500%20desayuno.png'
  }
]

const ListOfCategory = props => {
  return (
    <View style={styles.container}>
      <Title
        title='Categorias'
        styles={styles.title}
      />

      <ScrollView
        horizontal
        keyboardShouldPersistTaps='always'
      >
        {items.map(item => (
          <Category
            key={item.key}
            title={`Category ${item.key}`}
            source={{ uri: item.img }}
          />
        ))}
      </ScrollView>
    </View>
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
