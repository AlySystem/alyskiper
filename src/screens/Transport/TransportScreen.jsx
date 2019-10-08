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
import marker from '../../../assets/images/img-icon-alyskiper.png'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class TransportScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      latitude: 0,
      longitude: 0,
      coordinate: new AnimatedRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    }

    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-f069ca21-b139-418e-840a-60e5f47c36d3',
      subscribeKey: 'sub-c-bc17df7c-e24d-11e9-8eb2-6a824d15218a'
    })
    this.pubnub.init(this)
  }

  componentDidMount () {
    this.watchLocation()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
      this.pubnub.publish({
        message: {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        },
        channel: 'location'
      })
    }
  }

  componentWillUnmount () {
    Geolocation.clearWatch(this.watchId)
  }

  watchLocation = async () => {
    const permission = await hasLocationPermission()
    if(!permission) return
    const { coordinate } = this.state

    this.watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude
        })
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 0
      }
    )
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  })

  render () {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.screen}>
          <MapView
            style={{ flex: 1}}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
          >
            <Marker.Animated
              ref={marker => {
                this.marker = marker
              }}
              image={marker}
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
    flex: 1
  }
})

export default TransportScreen
