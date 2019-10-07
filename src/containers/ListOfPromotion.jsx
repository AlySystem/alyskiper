import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

// Import components
import Promotion from '../components/promotion/Promotion'
import Title from '../components/title/Title'

// Import theme
import { Theme } from '../constants/Theme'

const ListOfPromotion = props => {
  return (
    <View style={styles.container}>
      <Title
        title='Promociones'
        styles={styles.title}
      />
      <ScrollView
        horizontal
        keyboardShouldPersistTaps='always'
      >
        {[1, 2, 3, 4, 5].map((item, index) => (
          <Promotion
            key={index}
            source={{ uri: 'https://irt-cdn.multiscreensite.com/faded135fdb94f2580e44d784d28bfea/dms3rep/multi/339.jpg' }}
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

export default ListOfPromotion
