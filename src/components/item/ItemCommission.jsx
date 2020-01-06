import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

// Import components
import Picture from '../picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const ItemCommission = ({ picture = 1, name = '', symbol = '', price = 0, totalCrypto = 0.000502254351, onPress = () => { } }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.containerLeft}>
        <Picture
          source={picture}
          styles={styles.image}
        />
        <View>
          <Text allowFontScaling={false} style={styles.name}>{name}</Text>
          <View style={{ paddingVertical: 2 }} />
          <Text allowFontScaling={false} style={styles.symbol}>{symbol}</Text>
        </View>
      </View>

      <View style={styles.containerRight}>
        <Text allowFontScaling={false} style={styles.price}>${price.toString()}</Text>
        <View style={{ paddingVertical: 2 }} />
        <Text allowFontScaling={false} style={styles.total}>Total: {totalCrypto.toString()}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Theme.COLORS.colorMainDark + 'cc',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 20,
    marginBottom: 20,
    width: '100%',
  },
  image: {
    height: 70,
    resizeMode: 'contain',
    marginRight: 5,
    width: 70,
  },
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.subTitle
  },
  symbol: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
  },
  price: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  },
  containerRight: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  total: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    marginRight: 8
  }
})

export default ItemCommission
