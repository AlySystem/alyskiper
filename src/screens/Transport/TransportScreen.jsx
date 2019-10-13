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

// Import utils
import { hasLocationPermission } from '../../utils/PermissionLocation'

// Import theme
import { Theme } from '../../constants/Theme'

// Import marker
import markerImage from '../../../assets/images/img-icon-alyskiper.png'

const { width, height } = Dimensions.get('window')

class TransportScreen extends Component {

}

export default TransportScreen
