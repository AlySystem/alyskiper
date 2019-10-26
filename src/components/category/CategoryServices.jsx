import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'

// Import components
import Picture from '../picture/Picture'

const { width } = Dimensions.get('window')

const CategoryServices = props => {
  return (
    <View style={styles.container}>
      <Picture
        source={props.source}
        styles={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width
  },
  image: {
    resizeMode: 'contain',
    width: 300,
    height: 300
  }
})

export default CategoryServices
