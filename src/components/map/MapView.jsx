import React, { useEffect, useRef } from 'react'
import {
  Image,
  View,
  Platform
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Animatable from 'react-native-animatable'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Button from '../../components/button/Button'

// Import marker
import markerUser from '../../../assets/images/img-marker-user.png'

export const Map = props => {
  const { children, location, mapView } = props
  const marker = useRef(null)

  const centerToLocation = () => {
    mapView.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: location.latitudeDelta,
      longitudeDelta: location.longitudeDelta
    })
  }

  useEffect(() => {
    const animateMarker = () => {
      if (marker.current) {
        if (Platform.OS === 'android') {
          marker.current._component.animateMarkerToCoordinate({ latitude: location.latitude, longitude: location.longitude }, 500)
        }
      }
    }
    animateMarker()
  }, [location])

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        ref={mapView}
        loadingBackgroundColor={Theme.COLORS.colorMainDark}
        loadingIndicatorColor={Theme.COLORS.colorSecondary}
        loadingEnabled
        initialRegion={location}
        showsCompass={false}
        showsMyLocationButton={false}
      >
        <Marker.Animated
          ref={marker}
          coordinate={location}
        >
          <Image
            style={{
              width: 35,
              height: 35,
              resizeMode: 'contain'
            }}
            source={markerUser}
          />
        </Marker.Animated>

        {children}
      </MapView>
      <Animatable.View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 15,
          backgroundColor: Theme.COLORS.colorMainAlt,
          borderRadius: 200,
          padding: 15
        }}
        animation='zoomIn'
        iterationCount={1}
      >
        <Button
          iconName='my-location'
          iconSize={25}
          iconColor={Theme.COLORS.colorSecondary}
          onPress={centerToLocation}
        />
      </Animatable.View>
    </View>
  )
}

export default Map
