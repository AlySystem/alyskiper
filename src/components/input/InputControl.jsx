import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'

// Import components
import Icon from '../icon/Icon'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import Button from '../button/Button'
import Input from './Input'

// Import theme
import { Theme } from '../../constants/Theme'

const InputControl = (props) => {
  const [isVisible, setIsvisible] = useState(true)

  const { isActiveButton, isActiveIcon, isValid, errorText, value = '', setValue, secureTextEntry } = props
  return (
    <View style={props.stylesContainer || styles.container}>
      {secureTextEntry ? (
        <View style={{ position: 'relative' }}>
          <Input
            stylesInput={props.stylesInput}
            value={value}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            secureTextEntry={isVisible}
            refs={props.references}
          />
          {
            (isActiveButton && value.length > 0) &&
            <TouchableOpacity
              onPressIn={() => setIsvisible(false)}
              onPressOut={() => setIsvisible(true)}
              style={{
                position: 'absolute',
                backgroundColor: Theme.COLORS.colorSecondary,
                borderRadius: 25,
                top: 16,
                zIndex: 100,
                padding: 2,
                right: 50
              }}>
              <IconMaterial size={14} color='#000' name='remove-red-eye' />
            </TouchableOpacity>
          }
        </View>
      ) : (
          <TextInput
            value={value}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            underlineColorAndroid='transparent'
            multiline={false}
            autoCapitalize='none'
            autoCorrect={false}
            ref={props.references}
            style={props.stylesInput}
          />
        )}
      {
        isActiveIcon && (
          <Icon
            styles={props.stylesIcon || styles.icon}
            iconSize={props.iconSize}
            iconColor={props.iconColor}
            iconName={props.iconName}
          />
        )
      }
      {
        (isActiveButton && value.length > 0) && (
          <Button
            iconName='cancel'
            iconSize={20}
            iconColor={props.iconColor || Theme.COLORS.colorSecondary}
            onPress={() => setValue('')}
            stylesButton={props.stylesButton || styles.button}
            isActiveButton
          />
        )
      }

      {
        !isValid && (
          <View style={props.stylesError || styles.containerError}>
            <Text allowFontScaling={false} style={styles.errorText}>{errorText}</Text>
          </View>
        )
      }
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
