import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const ShowResult = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
    >
      <Text style={styles.title}>{props.title}</Text>
      <View style={{ paddingVertical: 2 }} />
      <Text style={styles.description}>{props.description}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: 15
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: 12
  }
})

export default ShowResult
