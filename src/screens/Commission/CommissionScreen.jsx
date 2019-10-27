import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import containers
import ListOfCryptocurrency from '../../containers/ListOfCryptocurrency'

const CommissionScreen = props => {
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps='always'
      >
        <View style={styles.layout}>
          <ListOfCryptocurrency />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS.colorMainDark
  },
  layout: {
    paddingHorizontal: 10,
    paddingVertical: 10
  }
})

export default CommissionScreen
