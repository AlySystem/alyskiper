import React from 'react'
import {
  StyleSheet,
  Dimensions,
  TextInput
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const Input = props => {
  return (
    <TextInput
      {...props}
      underlineColorAndroid='transparent'
      multiline={false}
      autoCapitalize='none'
      autoCorrect={false}
      ref={props.refs}
      style={props.stylesInput || styles.input}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 55,
    paddingVertical: 12,
    marginBottom: height * 0.03,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  }
})

export default Input
