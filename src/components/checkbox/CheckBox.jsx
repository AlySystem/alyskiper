import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import CheckBox from 'react-native-check-box'

// Import theme
import { Theme } from '../../constants/Theme'

const Check = props => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}
    >
      <CheckBox
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}
        onClick={props.handleCheck}
        isChecked={props.checked}
        checkBoxColor={Theme.COLORS.colorSecondary}
      />
      <Text allowFontScaling={false} style={styles.nameStyle}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  nameStyle: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    paddingLeft: 8,
    fontSize: Theme.SIZES.small
  }
})

export default Check
