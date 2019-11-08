import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Background from '../../components/background/Background'

// Import containers
import ListOfCryptocurrency from '../../containers/ListOfCryptocurrency'

const CommissionScreen = props => {
  return (
    <Background
      source={require('../../../assets/images/img-background-alyskiper.png')}
    >
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.layout}>
            <ListOfCryptocurrency />
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
  }
})

export default CommissionScreen
