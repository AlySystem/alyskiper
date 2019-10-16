import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

// Import components
import Input from './Input'

// Import theme
import { Theme } from '../../constants/Theme'

const InputCode = props => {
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [code3, setCode3] = useState('')
  const [code4, setCode4] = useState('')
  const [code5, setCode5] = useState('')
  const [code6, setCode6] = useState('')

  useEffect(() => {
    props.handleOnChange(`${code1}${code2}${code3}${code4}${code5}${code6}`)
  }, [code1, code2, code3, code4, code5, code6, props])

  return (
    <View style={styles.container}>
      <Input
        stylesInput={styles.input}
        value={props.code ? `${props.code[0]}` : code1}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={(value) => setCode1(value)}
        keyboardType='number-pad'
        maxLength={1}
        returnKeyType='next'
      />
      <Input
        stylesInput={styles.input}
        value={props.code ? `${props.code[1]}` : code2}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={(value) => setCode2(value)}
        keyboardType='number-pad'
        maxLength={1}
        returnKeyType='next'
      />
      <Input
        stylesInput={styles.input}
        value={props.code ? `${props.code[2]}` : code3}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={(value) => setCode3(value)}
        keyboardType='number-pad'
        maxLength={1}
        returnKeyType='next'
      />
      <Input
        stylesInput={styles.input}
        value={props.code ? `${props.code[3]}` : code4}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={(value) => setCode4(value)}
        keyboardType='number-pad'
        maxLength={1}
        returnKeyType='next'
      />
      <Input
        stylesInput={styles.input}
        value={props.code ? `${props.code[4]}` : code5}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={(value) => setCode5(value)}
        keyboardType='number-pad'
        maxLength={1}
        returnKeyType='next'
      />
      <Input
        stylesInput={styles.input}
        value={props.code ? `${props.code[5]}` : code6}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        onChangeText={(value) => setCode6(value)}
        keyboardType='number-pad'
        maxLength={1}
        returnKeyType='next'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%'
  },
  input: {
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.5,
    borderRadius: 5,
    width: 45,
    height: 45,
    color: Theme.COLORS.colorParagraph,
    marginHorizontal: 5,
    backgroundColor: Theme.COLORS.colorMainAlt,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal
  }
})

export default InputCode
