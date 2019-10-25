import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import { useSelector } from 'react-redux'
import MapView, { Polyline, Marker } from 'react-native-maps'

// Import components
import Background from '../../components/background/Background'
import Search from '../../components/search/Search'
import Loader from '../../components/loader/Loader'
import Details from '../../components/details/Details'
import Button from '../../components/button/Button'

// Import image
import marker from '../../../assets/images/img-icon-alyskiper.png'

// Import theme
import { Theme } from '../../constants/Theme'

// Import utils
import { routeDirection } from '../../utils/Directions'
import { getPixelSize } from '../../utils/Pixel'

const { height, width } = Dimensions.get('window')

const TransportScreen = props => {
  const location = useSelector(state => state.location)
  const [isLoading, setIsLoading] = useState(false)
  const [details, setDetails] = useState('')
  const [destination, setDestination] = useState(null)
  const mapView = useRef(null)

  const handleDetails = async (placeId, details) => {
    setIsLoading(true)
    const { latitude, longitude } = location
    const pointCoords = await routeDirection(placeId, latitude, longitude)

    setDestination(pointCoords)
    setDetails({ title: details.main_text, description: details.description })
    setIsLoading(false)
    mapView.current.fitToCoordinates(pointCoords, {
      edgePadding: {
        right: getPixelSize(50),
        left: getPixelSize(50),
        top: getPixelSize(50),
        bottom: getPixelSize(350)
      }
    })
  }

  return (
    <Background>
      <View style={styles.screen}>
        <MapView
          style={{ flex: 1 }}
          ref={mapView}
          showsUserLocation
          loadingEnabled
          loadingBackgroundColor={Theme.COLORS.colorMainAlt}
          loadingIndicatorColor={Theme.COLORS.colorSecondary}
          region={location}
        >
          {destination && (
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
              >
                <Details
                  title={details.title}
                />
              </Marker>
            </>
          )}
        </MapView>
        {destination ? (
          <>
            <Button
              onPress={() => setDestination(null)}
              iconName='arrow-back'
              iconSize={28}
              stylesButton={styles.buttonBack}
              iconColor={Theme.COLORS.colorMainAlt}
            />
          </>
        ) : isLoading ? (
          <View style={styles.containerLoader}>
            <Loader
              color={Theme.COLORS.colorMainAlt}
            />
          </View>
        ) : (
          <View style={styles.containerInput}>
            <Search
              handleDetails={handleDetails}
              origen={location}
              stylesInput={styles.input}
              containerPredictions={styles.containerPredictions}
            />
          </View>
        )}

      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  containerLoader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%'
  },
  containerPredictions: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    position: 'relative',
    top: 2
  },
  buttonBack: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.05
  },
  input: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 8,
    paddingLeft: 55,
    paddingRight: 50,
    paddingVertical: 10,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  containerInput: {
    position: 'absolute',
    top: height * 0.05,
    width: '100%',
    paddingHorizontal: 15
  }
})

export default TransportScreen
