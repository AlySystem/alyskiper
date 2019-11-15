import React from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import { Theme } from '../../constants/Theme'

const Payment = props => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <Image
        style={{
          width: 80,
          height: 50,
          resizeMode: 'contain'
        }} source={require('../../../assets/images/img-cash.png')}
      />
      <Text
        allowFontScaling={false}
        style={{
          color: Theme.COLORS.colorParagraph,
          fontFamily: 'Lato-Regular',
          fontSize: Theme.SIZES.small
        }}
      >Efectivo
      </Text>
    </View>
  )
}

export default Payment
