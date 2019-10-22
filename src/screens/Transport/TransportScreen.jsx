import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native'

import MapView, { AnimatedRegion } from 'react-native-maps'
import PubNubReact from 'pubnub-react'


const LATITUDE = 37.78825
const LONGITUDE = -122.4324

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
    
  };

  render () {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={{
              latitude: 12.1013507,
              longitude: -86.2587655,
              longitudeDelta: 0.0134,
              latitudeDelta:0.0143,
            }}
          >
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
