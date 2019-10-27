import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import MapView, { Polyline, Marker } from 'react-native-maps'

// Import components
import Background from '../../components/background/Background'
import Loader from '../../components/loader/Loader'

// Import image
import marker from '../../../assets/images/img-icon-alyskiper.png'

// Import theme
import { Theme } from '../../constants/Theme'

// Import utils
import { getPixelSize } from '../../utils/Pixel'

const DetailsTransportScreen = props => {
  const [destination, setDestination] = useState()
  const [region, setRegion] = useState()
  const [isLoading, setIsLoading] = useState(true)
  // props.navigation.getParam('destination', [])
  // props.navigation.getParam('region', [])
  const mapView = useRef(null)
  useEffect(() => {
    setDestination(props.navigation.getParam('destination', []))
    setRegion(props.navigation.getParam('region', []))
    mapView.current.fitToCoordinates(destination, {
      edgePadding: {
        right: getPixelSize(5),
        left: getPixelSize(5),
        top: getPixelSize(5),
        bottom: getPixelSize(5)
      }
    })
    console.log(destination)
    console.log(region)
    setIsLoading(false)
  }, [mapView])

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <View style={{ height: 250 }}>
            <MapView
              style={{ flex: 1 }}
              ref={mapView}
              loadingEnabled
              loadingBackgroundColor={Theme.COLORS.colorMainAlt}
              loadingIndicatorColor={Theme.COLORS.colorSecondary}
              region={region || { latitude: 0, longitude: 0, latitudeDelta: 1.234, longitudeDelta: 2.128 }}
            >
              <>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <Polyline
                      coordinates={destination}
                      strokeWidth={3}
                      strokeColor={Theme.COLORS.colorMainAlt}
                    />

                    <Marker
                      coordinate={destination[destination.length - 1]}
                      anchor={{ x: 0, y: 0 }}
                      image={marker}
                    />
                  </>
                )}
              </>
            </MapView>
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})

export default DetailsTransportScreen
