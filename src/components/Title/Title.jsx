import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const Title = props => {
  return (
    <View style={styles.container}>
      {props.capitalLetter && (
        <Text style={styles.capitalLetter}>{props.firstLetter}</Text>
      )}
      <Text style={props.styles || styles.title}>{props.title}</Text>
    </View>
  )
}

Title.defaultProps = {
  title: 'Undefined'
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  capitalLetter: {
    fontFamily: 'Matura MT Script Capitals',
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.h1
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.title,
    fontFamily: 'Lato-Bold'
  }
})

export default Title
