import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native'
import { useSelector } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import MapView, { Polyline, Marker } from 'react-native-maps'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import InputControl from '../../components/input/InputControl'
import Modal from '../../components/modal/Modal'
import Icon from '../../components/icon/Icon'
import Search from '../../components/search/Search'
import Loader from '../../components/loader/Loader'
import Button from '../../components/button/Button'

// Import utils
import { routeDirection } from '../../utils/Directions'
import { getPixelSize } from '../../utils/Pixel'

const { width, height } = Dimensions.get('window')

const TransportScreen = props => {
  const { navigate } = props.navigation
  const location = useSelector(state => state.location)
  const userData = useSelector(state => state.user)
  const [isVisible, setIsVisible] = useState(false)
  const [steps, setSteps] = useState(null)
  const [destination, setDestination] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const mapView = useRef(null)
  const inputRef = useRef(null)

  const handleDetails = async (placeId) => {
    setIsLoading(true)
    const { latitude, longitude } = location
    const { pointCoords, steps } = await routeDirection(placeId, latitude, longitude)
    setIsLoading(false)
    setDestination(pointCoords)
    setSteps(steps)
    mapView.current.fitToCoordinates(pointCoords, {
      edgePadding: {
        right: getPixelSize(50),
        left: getPixelSize(50),
        top: getPixelSize(50),
        bottom: getPixelSize(280)
      }
    })
  }

  const handleCenterToRegion = () => {
    mapView.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: location.latitudeDelta,
      longitudeDelta: location.longitudeDelta
    })
  }

  useEffect(() => {
    if (location.details) {
      const details = location.details
      const { placeId, destination } = details
      handleDetails(placeId, destination.latitude, destination.longitude)
    }
  }, [location])

  return (
    <View style={styles.screen}>
      <Modal
        isVisible={isVisible}
        style={{
          margin: 0,
          backgroundColor: Theme.COLORS.colorMainDark
        }}
      >
        <Icon
          iconName='close'
          iconSize={30}
          onPress={() => setIsVisible(!isVisible)}
          styles={{
            paddingHorizontal: 10,
            position: 'absolute',
            top: 10,
            left: 5
          }}
        />

        <View style={styles.modalLayout}>
          <Search />
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => {
              setIsVisible(!isVisible)
              return navigate('FixedMap')
            }}
          >
            <FontAwesomeIcons
              name='map-pin'
              size={30}
              color={Theme.COLORS.colorSecondary}
              style={{
                marginRight: 25
              }}
            />
            <Text style={styles.textModal}>Seleccionar origen en el mapa</Text>
          </TouchableOpacity>
        </View>

      </Modal>
      <View style={{ flex: 1, position: 'relative' }}>
        <MapView
          style={{ flex: 1 }}
          ref={mapView}
          loadingBackgroundColor={Theme.COLORS.colorMainDark}
          loadingIndicatorColor={Theme.COLORS.colorSecondary}
          showsUserLocation
          loadingEnabled
          initialRegion={location}
          showsCompass={false}
          showsMyLocationButton={false}
        >
          {destination && (
            <>
              <Polyline
                coordinates={destination}
                strokeWidth={3}
                strokeColor={Theme.COLORS.colorMain}
              />
            </>
          )}

        </MapView>
        {location && (
          <Animatable.View
            style={styles.containerButtonRegion}
            animation='zoomIn'
            iterationCount={1}
          >
            <Button
              iconName='my-location'
              iconSize={35}
              iconColor={Theme.COLORS.colorSecondary}
              onPress={handleCenterToRegion}
            />
          </Animatable.View>
        )}
      </View>

      {destination ? (
        <>
          <Button
            onPress={() => {
              return setDestination(null)
            }}
            iconName='arrow-back'
            iconSize={30}
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
        <Animatable.View
          animation='slideInUp'
          iterationCount={1}
          style={styles.container}
        >
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={{
              paddingHorizontal: 10,
              width: '100%'
            }}
          >
            <View
              pointerEvents='none'
            >
              <InputControl
                references={inputRef}
                isActiveIcon
                iconName='search'
                iconSize={28}
                placeholder={`${userData.firstName}, ¿Donde quires ir?`}
                placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
              />
            </View>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Theme.COLORS.colorMainDark,
    flex: 1
  },
  container: {
    backgroundColor: Theme.COLORS.colorMainDark,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  modalLayout: {
    flex: 1,
    paddingVertical: 55,
    paddingHorizontal: 20
  },
  modalItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  textModal: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  },
  buttonBack: {
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.05
  },
  containerLoader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%'
  },
  containerButtonRegion: {
    position: 'absolute',
    bottom: 20,
    right: 15,
    backgroundColor: Theme.COLORS.colorMain,
    borderRadius: 200,
    padding: 10
  }
})

export default TransportScreen
