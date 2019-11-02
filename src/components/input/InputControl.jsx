import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import components
import Icon from '../icon/Icon'
import Button from '../button/Button'
import Input from './Input'

// Import theme
import { Theme } from '../../constants/Theme'

const InputControl = props => {
  const { isActiveButton, isActiveIcon, isValid, errorText, value = '', setValue, secureTextEntry } = props

  return (
    <View style={props.stylesContainer || styles.container}>
      {secureTextEntry ? (
        <Input
          stylesInput={props.stylesInput}
          value={value}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          secureTextEntry
          refs={props.references}
        />
      ) : (
        <Input
          stylesInput={props.stylesInput}
          value={value}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          refs={props.references}
        />
      )}
      {isActiveIcon && (
        <Icon
          styles={props.stylesIcon || styles.icon}
          iconSize={props.iconSize}
          iconColor={props.iconColor}
          iconName={props.iconName}
        />
      )}
      {(isActiveButton && value.length > 0) && (
        <Button
          iconName='cancel'
          iconSize={20}
          iconColor={props.iconColor || Theme.COLORS.colorSecondary}
          onPress={() => setValue('')}
          stylesButton={props.stylesButton || styles.button}
          isActiveButton
        />
      )}

      {!isValid && (
        <View style={props.stylesError || styles.containerError}>
          <Text allowFontScaling={false} style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%'
  },
  icon: {
    position: 'absolute',
    top: 13,
    left: 18
  },
  containerError: {
    position: 'absolute',
    bottom: 3,
    left: 8
  },
  errorText: {
    color: 'red',
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.xsamll
  },
  button: {
    position: 'absolute',
    right: 20,
    top: 15
  }
})

export default InputControl
