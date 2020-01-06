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

const ItemCommission = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.containerLeft}>
        <Picture
          source={props.source}
          styles={styles.image}
        />
        <View>
          <Text allowFontScaling={false} style={styles.name}>{props.name}</Text>
          <View style={{ paddingVertical: 2 }} />
          <Text allowFontScaling={false} style={styles.symbol}>{props.symbol}</Text>
        </View>
      </View>

      <View style={styles.containerCenter}>
        <Text allowFontScaling={false} style={styles.price}>${props.price}</Text>
        <Text allowFontScaling={false} style={styles.percentChange}>{props.percent_change}</Text>
      </View>
      <View style={styles.containerAbsolute}>
        <Text allowFontScaling={false} style={styles.total}>TOTAL:</Text>
        <Text allowFontScaling={false} style={styles.total}>3.4345903823</Text>
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
  percentChange: {
    color: 'green'
  },
  containerCenter: {
    width: '30%'
  },
  containerAbsolute: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    flexDirection: 'row'
  },
  total: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    marginRight: 8
  }
})

export default ItemCommission
