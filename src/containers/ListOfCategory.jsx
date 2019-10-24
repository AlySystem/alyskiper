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
        {[0, 1, 2, 3, 4, 5, 6, 7].map(item => (
          <Category
            key={item}
            title={`Category ${item}`}
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
