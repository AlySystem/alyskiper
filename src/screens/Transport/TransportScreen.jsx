import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  SafeAreaView
} from 'react-native'

import MapView, { Marker, AnimatedRegion } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import PubNubReact from 'pubnub-react'
import MapView from 'react-native-maps'

// Import components
import Background from '../../components/background/Background'

// Import utils
import { hasLocationPermission } from '../../utils/PermissionLocation'

// Import theme
import { Theme } from '../../constants/Theme'

// Import marker
import markerImage from '../../../assets/images/img-icon-alyskiper.png'

const { width, height } = Dimensions.get('window')

const TransportScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <MapView 
          style={styles.map}
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  map: {
    flex: 1
  }
})

export default TransportScreen
