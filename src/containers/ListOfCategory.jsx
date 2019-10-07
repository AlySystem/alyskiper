import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

// Import components
import Category from '../components/category/Category'

// Import theme
import { Theme } from '../constants/Theme'

const ListOfCategory = props => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        keyboardShouldPersistTaps='always'
      >
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <Category
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.title,
    fontFamily: 'Lato-Bold'
  }
})

export default ListOfCategory
