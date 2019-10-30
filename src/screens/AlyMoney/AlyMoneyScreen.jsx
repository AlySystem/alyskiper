import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

// Import components
import Picture from '../../components/picture/Picture'

// Import screen
import GainScreen from '../Gain/GainScreen'
import CommissionScreen from '../Commission/CommissionScreen'

// Import theme
import { Theme } from '../../constants/Theme'

const { width } = Dimensions.get('window')

const AlyMoneyScreen = props => {
  const [index, setIndex] = useState(0)
  const routes = [
    { key: 'gain', title: 'Ganancias' },
    { key: 'comission', title: 'Comisiones' }
  ]

  return (
    <>
      <View style={styles.header}>
        <Picture
          source={require('../../../assets/images/img-logo-alycoin.png')}
          styles={styles.image}
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          gain: GainScreen,
          comission: CommissionScreen
        })}
        onIndexChange={index => setIndex(index)}
        initialLayout={{ width: width }}
        lazy
        renderTabBar={props => (
          <TabBar
            indicatorStyle={styles.indicatorStyle}
            style={styles.tab}
            {...props}
          />)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: Theme.COLORS.colorMainDark
  },
  indicatorStyle: {
    backgroundColor: Theme.COLORS.colorSecondary
  },
  header: {
    backgroundColor: Theme.COLORS.colorMainDark
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  }
})

export default AlyMoneyScreen
