import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import { Backdrop } from 'react-native-backdrop'

// Import components
import { Map } from '../../components/map/MapView'

// Import utils
// import { Location } from '../../utils/Location'
import { useLocation } from '../../hooks/useLocation'

// Import theme
import { Theme } from '../../constants/Theme'

const OrderTracingScreen = props => {
  // const { location } = Location()
  const { location } = useLocation()
  const [visible, setVisible] = useState(true)
  const mapView = useRef(null)

  return (
    <View style={{ flex: 1, backgroundColor: Theme.COLORS.colorMainAlt }}>
      {location.latitude && (
        <Map mapView={mapView} location={location} />
      )}
      <View style={{ height: 60 }} />
      <Backdrop
        visible={visible}
        closedHeight={60}
        backdropHeight={60}
        handleOpen={() => setVisible(true)}
        handleClose={() => {}}
        swipeConfig={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80
        }}
        animationConfig={{
          speed: 14,
          bounciness: 4
        }}
        overlayColor='rgba(0,0,0,0.5)'
        backdropStyle={{
          backgroundColor: Theme.COLORS.colorMainDark,
          opacity: 0.8
        }}
      >
        <Text style={{ color: 'white' }}>Backdrop</Text>
        <Text style={{ color: 'white' }}>Backdrop</Text>
        <Text style={{ color: 'white' }}>Backdrop</Text>
        <Text style={{ color: 'white' }}>Backdrop</Text>
        <Text style={{ color: 'white' }}>Backdrop</Text>
      </Backdrop>
    </View>
  )
}

export default OrderTracingScreen
