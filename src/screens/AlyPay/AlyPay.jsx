import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

// Import components
import Background from '../../components/background/Background'

// Import Assets
import ImageBackground from '../../../assets/images/background-alymoney.png'
import ImageAlyPay from '../../../assets/images/alypay.png'

// Import containers
import ItemCommission from '../../components/item/ItemCommission'
import PinAuth from './AuthPin'

const AlyPay = (props) => {

  const items = [
    {
      img: require('../../../assets/images/img-logo-alycoin-alt.png'),
      name: 'Alycoin',
      symbol: 'ALY',
      price: 1,
    },
    {
      img: require('../../../assets/images/img-logo-bitcoin.png'),
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 8030,
    },
    {
      img: require('../../../assets/images/img-logo-dash.png'),
      name: 'Dash',
      symbol: 'DASH',
      price: 120,
    },
    {
      img: require('../../../assets/images/img-logo-ethereum.png'),
      name: 'Ethereum',
      symbol: 'ETH',
      price: 140,
    },
    {
      img: require('../../../assets/images/img-logo-litecoin.png'),
      name: 'Litecoin',
      symbol: 'LTC',
      price: 180,
    }
  ]

  return (
    <Background source={ImageBackground}>
      <PinAuth />

      <View style={styles.screen}>
        <ScrollView keyboardShouldPersistTaps='always'>
          <Image style={styles.imageAly} source={ImageAlyPay} />

          <View style={styles.layout}>
            {
              items.map((item, key) => (
                <ItemCommission
                  onPress={() => props.navigation.navigate('DetailsCrypto')}
                  key={key}
                  name={item.name}
                  symbol={item.symbol}
                  picture={item.img}
                  price={item.price}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.4)'
  },
  layout: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  imageAly: {
    alignSelf: 'center',
    height: RFValue(100),
    resizeMode: 'contain',
    width: RFValue(180),
  }
})

export default AlyPay
