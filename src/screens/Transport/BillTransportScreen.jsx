import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'

// Import components
import Background from '../../components/background/Background'

// Import theme
import { Theme } from '../../constants/Theme'

const BillTransportScreen = props => {
  const { travel, direction } = useSelector(state => state)

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <View style={styles.container}>
            <View style={styles.itemAlt}>
              <Text allowFontScaling={false} style={styles.text}>DURACION</Text>
              <Text allowFontScaling={false} style={styles.value}>{direction.steps.duration.text}</Text>
            </View>
            <View style={styles.item}>
              <Text allowFontScaling={false} style={styles.text}>DISTANCIA</Text>
              <Text allowFontScaling={false} style={styles.value}>{direction.steps.distance.text}</Text>
            </View>
          </View>

          <View style={styles.containerAddress}>
            <Text allowFontScaling={false} style={styles.text}>ORIGEN</Text>
            <Text allowFontScaling={false} style={styles.textAddress}>{direction.start_address}</Text>
          </View>

          <View style={styles.containerAddress}>
            <Text allowFontScaling={false} style={styles.text}>DESTINO</Text>
            <Text allowFontScaling={false} style={styles.textAddress}>{direction.end_address}</Text>
          </View>

          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.text}>CATEGORIA</Text>
            {/* <Text allowFontScaling={false} style={styles.textCategory}>{category.toUpperCase()}</Text> */}
          </View>

          <View style={styles.containerPrice}>
            <View style={styles.container}>
              <Text allowFontScaling={false} style={styles.text}>PRECIO BASE</Text>
              <Text allowFontScaling={false} style={styles.value}>{travel.priceTravel.priceBase}</Text>
            </View>

            <View style={styles.container}>
              <Text allowFontScaling={false} style={styles.text}>PRECIO POR DISTANCIA</Text>
              <Text allowFontScaling={false} style={styles.value}>{travel.priceTravel.priceKilometer}</Text>
            </View>

            <View style={styles.container}>
              <Text allowFontScaling={false} style={styles.text}>PRECIO POR TIEMPO</Text>
              <Text allowFontScaling={false} style={styles.value}>{travel.priceTravel.priceMinute}</Text>
            </View>
          </View>

          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.text}>TOTAL</Text>
            <Text allowFontScaling={false} style={styles.value}>{travel.priceTravel.priceTravel}</Text>
          </View>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  layout: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  containerAddress: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  textAddress: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    paddingVertical: 5
  },
  item: {
    flexGrow: 1,
    borderLeftColor: Theme.COLORS.colorSecondary,
    borderLeftWidth: 1,
    alignItems: 'flex-end'
  },
  itemAlt: {
    flexGrow: 1
  },
  text: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.small,
    marginVertical: 3
  }
})

export default BillTransportScreen
