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
    <View style={props.stylesContainer || styles.container}>
      <Text allowFontScaling={false} style={props.styles || styles.title}>{props.title}</Text>
    </View>
  )
}

Title.defaultProps = {
  title: 'Undefined'
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.title,
    fontFamily: 'Lato-Bold'
  }
})

export default Title
