import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
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
import Details from '../../components/details/Details'

// Import image
import silverMarker from '../../../assets/images/img-icon-silver.png'
import goldenMarker from '../../../assets/images/img-icon-golden.png'
import vipMarker from '../../../assets/images/img-icon-vip.png'
import presidentMarker from '../../../assets/images/img-icon-president.png'

// Import custom hooks
import { usePubnub } from '../../hooks/usePubnub'

// Import container
import ListOfCategoryServices from '../../containers/ListOfCategoryServices'
import ListOfAddress from '../../containers/ListOfAddress'

// Import utils
import { routeDirection } from '../../utils/Directions'
import { getPixelSize } from '../../utils/Pixel'

// Import actions types
import { REMOVEDETAILSLOCATION } from '../../store/actionTypes'

const { width, height } = Dimensions.get('window')

const TransportScreen = props => {
  const { navigate } = props.navigation
  const dispatch = useDispatch()
  const { silver, golden, vip, president } = usePubnub()
  const location = useSelector(state => state.location)
  const userData = useSelector(state => state.user)
  const address = useSelector(state => state.address)
  const [isVisible, setIsVisible] = useState(false)
  const [details, setDetails] = useState('')
  const [steps, setSteps] = useState(null)
  const [destination, setDestination] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const mapView = useRef(null)
  const inputRef = useRef(null)
  const marker = useRef(null)
  // console.log(address === {} ? 280 : 170)
  console.log('aqui', address)

  const handleDetails = async (placeId, details) => {
    setIsLoading(true)
    const { latitude, longitude } = location
    const { pointCoords, steps } = await routeDirection(placeId, latitude, longitude)

    setIsLoading(false)
    setDestination(pointCoords)
    setSteps(steps)
    setDetails(details)
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
      const { placeId, address } = details
      handleDetails(placeId, address)
    }
  }, [location])

  const handleBack = () => {
    setDestination(null)

    dispatch({
      type: REMOVEDETAILSLOCATION,
      payload: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134
      }
    })
  }
  return (
    <View style={styles.screen}>
      <Modal
        isVisible={isVisible}
        animationInTiming={500}
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
          <Search
            navigation={props.navigation}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />
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
          {silver && (
            silver.map(drive => (
              <Marker
                style={styles.marker}
                key={drive.uuid}
                coordinate={{
                  latitude: drive.state.coords.latitude,
                  longitude: drive.state.coords.longitude
                }}
                ref={marker}
              >
                <Image
                  style={styles.drive}
                  source={silverMarker}
                />
              </Marker>
            ))
          )}

          {golden && (
            golden.map(drive => (
              <Marker
                style={styles.marker}
                key={drive.uuid}
                coordinate={{
                  latitude: drive.state.coords.latitude,
                  longitude: drive.state.coords.longitude
                }}
                ref={marker}
              >
                <Image
                  style={styles.drive}
                  source={goldenMarker}
                />
              </Marker>
            ))
          )}

          {vip && (
            vip.map(drive => (
              <Marker
                style={styles.marker}
                key={drive.uuid}
                coordinate={{
                  latitude: drive.state.coords.latitude,
                  longitude: drive.state.coords.longitude
                }}
                ref={marker}
              >
                <Image
                  style={styles.drive}
                  source={vipMarker}
                />
              </Marker>
            ))
          )}

          {president && (
            president.map(drive => (
              <Marker
                style={styles.marker}
                key={drive.uuid}
                coordinate={{
                  latitude: drive.state.coords.latitude,
                  longitude: drive.state.coords.longitude
                }}
                ref={marker}
              >
                <Image
                  style={styles.drive}
                  source={presidentMarker}
                />
              </Marker>
            ))
          )}

          {destination && (
            <>
              <Polyline
                coordinates={destination}
                strokeWidth={3}
                strokeColor={Theme.COLORS.colorMain}
              />
              <Marker
                coordinate={destination[destination.length - 1]}
                anchor={{ x: 0, y: 0 }}
              >
                <Details
                  title={details}
                />
              </Marker>
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
            onPress={handleBack}
            iconName='arrow-back'
            iconSize={30}
            stylesButton={styles.buttonBack}
            iconColor={Theme.COLORS.colorMainAlt}
          />
          <ListOfCategoryServices
            navigation={props.navigation}
            steps={steps}
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
          style={[
            styles.container,
            {
              height: address.flag ? 280 : 170,
              justifyContent: address.flag ? 'space-between' : 'space-evenly'
            }
          ]}
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

          {address.flag ? (
            <View style={{
              width: '100%',
              paddingHorizontal: 10
            }}
            >
              <Text
                allowFontScaling={false} style={{
                  color: Theme.COLORS.colorSecondary,
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  textAlign: 'center'
                }}
              >DIRECCIONES
              </Text>
              <ListOfAddress />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => navigate('Address')}
            >
              <Text style={{
                color: Theme.COLORS.colorSecondary,
                fontFamily: 'Lato-Regular',
                fontSize: Theme.SIZES.normal
              }}
              >Agregar direcciones
              </Text>
            </TouchableOpacity>
          )}
        </Animatable.View>
      )}

      {!destination && (
        <Animatable.View
          animation='fadeInRight'
          iterationCount={1}
          style={styles.buttonBack}
        >
          <Button
            onPress={() => props.navigation.goBack()}
            iconName='keyboard-backspace'
            iconSize={35}
            iconColor={Theme.COLORS.colorMainAlt}
          />
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
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20
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
  },
  drive: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  marker: {
    // position: 'relative'
  },
  containerTooltip: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Theme.COLORS.colorMainAlt,
    position: 'absolute',
    top: 0,
    left: 0
  }
})

export default TransportScreen
