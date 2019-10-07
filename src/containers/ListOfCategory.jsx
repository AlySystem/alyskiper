import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

// Import components
import Title from '../components/title/Title'
import Category from '../components/category/Category'

const ListOfCategory = props => {
  return (
    <View>
      <Title
        capitalLetter
        title='Categorias'
        styles={styles.title}
      />
      <ScrollView
        horizontal
      >
        <Category />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {

  }
})

export default ListOfCategory
