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
          borderColor: Theme.COLORS.colorSecondary,
          borderWidth: 1,
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
    width: 120,
    height: 120,
    borderRadius: 200
  }
})

export default CategoryServices
