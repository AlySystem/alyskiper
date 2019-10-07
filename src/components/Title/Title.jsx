import React from 'react'
import {
  Text,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const Title = props => {
  return (
    <Text style={props.styles || styles.title}>{props.title}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.title,
    fontFamily: 'Lato-Bold'
  }
})

export default Title
