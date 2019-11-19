import React, { useState } from 'react'
import {
  Image,
  View
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

  const centerToLocation = () => {
    mapView.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: location.latitudeDelta,
      longitudeDelta: location.longitudeDelta
    })
  }

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
        <Marker
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
        </Marker>

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
