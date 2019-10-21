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

// Import components
import Background from '../../components/background/Background'

// Import utils
import { hasLocationPermission } from '../../utils/PermissionLocation'

// Import theme
import { Theme } from '../../constants/Theme'

// Import marker
import markerImage from '../../../assets/images/img-icon-alyskiper.png'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = 37.78825
const LONGITUDE = -122.4324
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class TransportScreen extends Component {
  constructor (props) {
    super(props)

    // this.pubnub = new PubNubReact({
    //   publishKey: 'pub-c-1271b42f-b90f-402d-99a8-749d0d2a13a7',
    //   subscribeKey: 'sub-c-36cd6120-e9e6-11e9-bee7-82748ed6f7e5'
    // })

    // this.state = {
    //   latitude: LATITUDE,
    //   longitude: LONGITUDE,
    //   coordinate: new AnimatedRegion({
    //     latitude: LATITUDE,
    //     longitude: LONGITUDE,
    //     latitudeDelta: 0,
    //     longitudeDelta: 0
    //   })
    // }

    // this.pubnub.init(this)
  }

  componentDidMount () {
    // this.subscribeToPubNub();
  }

  subscribeToPubNub = () => {
    // this.pubnub.subscribe({
    //   channels: ['enLinea'],
    //   withPresence: true,
    // });

    // this.pubnub.addListener({
    //   status: function(statusEvent) {
        
    //   },
    //   message: function(message) {
    //     // console.log(message)
    //   },
    //   presence: function(presenceEvent) {
    //     console.log(presenceEvent)
    //     const newCoordinate = presenceEvent.state.coords
    //     this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
    //   }
    // })
  };

  render () {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={{
              latitude: 12.1013507,
              longitude: -86.2587655,
              longitudeDelta: 0.0134,
              latitudeDelta:0.0143 ,
            }}
          >
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView> */}
        </View>
      </SafeAreaView>
    )
  }
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
