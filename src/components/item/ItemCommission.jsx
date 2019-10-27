import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

// Import components
import Picture from '../picture/Picture'

const ItemCommission = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
      <View style={styles.containerLeft}>
        <Picture
          source={props.source}
          styles={styles.image}
        />
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.symbol}>{props.symbol}</Text>
        </View>
      </View>

      <View style={styles.containerCenter}>
        <Text style={styles.price}>{props.price}</Text>
        <Text style={styles.percentChange}>{props.percent_change}</Text>
      </View>

      <View />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  image: {

  },
  containerLeft: {

  },
  name: {

  },
  symbol: {

  },
  price: {

  },
  percentChange: {

  }
})

export default ItemCommission
