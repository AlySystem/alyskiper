import React, { useRef, useState } from 'react'
import {
  View,
  TouchableHighlight
} from 'react-native'

// Import components
import { Map } from '../../components/map/MapView'
import Modal from '../../components/modal/Modal'
import Button from '../../components/button/Button'

// Import hooks
import { useLocation } from '../../hooks/useLocation'

// Import theme
import { Theme } from '../../constants/Theme'

const OrderTracingScreen = props => {
  const { location } = useLocation()
  const [visible, setVisible] = useState(true)
  // const [visible, setVisible] = useState(false)
  const mapView = useRef(null)

  return (
    <View style={{ flex: 1, backgroundColor: Theme.COLORS.colorParagraph }}>
      {location.latitude && (
        <Map mapView={mapView} location={location} />
      )}
      <TouchableHighlight
        onPress={() => setVisible(!visible)}
        style={{
          backgroundColor: Theme.COLORS.colorMainAlt,
          height: 60,
          position: 'relative',
          bottom: 0,
          left: 0,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingVertical: 10
        }}
      >
        <View style={{
          backgroundColor: Theme.COLORS.colorSecondary,
          height: 6,
          width: 60,
          borderRadius: 100
        }}
        />
      </TouchableHighlight>
      <Modal
        isVisible={visible}
        style={{
          backgroundColor: Theme.COLORS.colorMainAlt,
          margin: 0
        }}
      >
        <Button
          iconName='cancel'
          stylesButton={{
            position: 'absolute',
            top: 5,
            right: 10
          }}
          onPress={() => setVisible(!visible)}
        />
      </Modal>
    </View>
  )
}

export default OrderTracingScreen
