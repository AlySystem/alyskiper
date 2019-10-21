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

    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-1271b42f-b90f-402d-99a8-749d0d2a13a7',
      subscribeKey: 'sub-c-36cd6120-e9e6-11e9-bee7-82748ed6f7e5'
    })

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    }

    this.pubnub.init(this)
  }

  componentDidMount () {
    this.subscribeToPubNub();
  }

  subscribeToPubNub = () => {
    this.pubnub.subscribe({
      channels: ['enLinea'],
      withPresence: true,
    });
    this.pubnub.getMessage('location', msg => {
      const { coordinate } = this.state;
      const { latitude, longitude } = msg.message;
      const newCoordinate = { latitude, longitude };

      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
        }
      } else {
        coordinate.timing(newCoordinate).start();
      }

      this.setState({
        latitude,
        longitude,
      });
    });
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render () {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
          >
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
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
