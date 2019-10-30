import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const ButtonQuantity = props => {
  return (
    <View
      style={styles.button}
    >
      <TouchableOpacity
        onPress={props.handleDecrement}
      >
        <Text allowFontScaling={false} style={styles.textButton}>-</Text>
      </TouchableOpacity>
      <Text allowFontScaling={false} style={styles.count}>{props.count}</Text>
      <TouchableOpacity
        onPress={props.handleIncrement}
      >
        <Text allowFontScaling={false} style={styles.textButton}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.2,
    width: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  textButton: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.h1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  count: {
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorSecondary
  }
})

export default ButtonQuantity
