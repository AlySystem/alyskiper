import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

// Import components
import Picture from '../picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const CategoryServices = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
      <View
        style={{
          borderRadius: 200,
          padding: 5
        }}
      >
        <Picture
          source={props.source}
          styles={styles.image}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.colorMainAlt,
    width: '100%'
  },
  image: {
    resizeMode: 'contain',
    width: 150,
    height: 150
  }
})

export default CategoryServices
