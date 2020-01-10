import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const ItemCommission = ({ picture = '', name = '', symbol = '', onPress = () => { } }) => {
  const [loadingImage, setLoadingImage] = useState(true)
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {
        loadingImage &&
        <ActivityIndicator color="#FFF" size="small" />
      }
      <View style={styles.containerLeft}>
        <Image
          onLoadEnd={() => setLoadingImage(false)}
          source={{ uri: picture }}
          style={styles.image}
        />
        <View>
          <Text allowFontScaling={false} style={styles.name}>{name}</Text>
          <View style={{ paddingVertical: 2 }} />
          <Text allowFontScaling={false} style={styles.symbol}>{symbol}</Text>
        </View>
      </View>

      <View style={styles.containerRight}>
        <Text allowFontScaling={false} style={styles.price}>0.0000045</Text>
        <View style={{ paddingVertical: 2 }} />
        <Text allowFontScaling={false} style={styles.total}>Total</Text>
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
