import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native'

const TextArea = props => {
  const [count, setCount] = useState(0)

  const handleOnChange = value => {
    const { onChangeText } = props

    setCount(value.length)
    if (onChangeText) onChangeText(value)
  }
  return (
    <View style={props.stylesContainer || styles.container}>
      <TextInput
        {...props}
        underlineColorAndroid='transparent'
        style={props.stylesInput}
        onChangeText={handleOnChange}
        multiline
      />
      <Text allowFontScaling={false} style={props.stylesCount || styles.count}>{`${count} / ${props.maxLength}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 140,
    position: 'relative'
  },
  count: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 12,
    color: '#ccc'
  }
})

export default TextArea
