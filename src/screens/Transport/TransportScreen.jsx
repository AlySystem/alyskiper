import React, { useRef, useState, useEffect, useMemo } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  BackHandler,
  Image,
  Alert
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Polyline, Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'
import AsyncStorage from '@react-native-community/async-storage'
import { RFValue } from 'react-native-responsive-fontsize'

// Import actions
import { REMOVEDIRECTION, DIRECTION, DRIVERS } from '../../store/actionTypes'

// Import theme
import { Theme } from '../../constants/Theme'

// Import custom hooks
import { useWatchLocation } from '../../hooks/useWatchLocation'

// Import components
import { Map } from '../../components/map/MapView'
import InputControl from '../../components/input/InputControl'
import ModalTransport from '../../components/modal/ModalTransport'
import Button from '../../components/button/Button'
import Loader from '../../components/loader/Loader'
import Picture from '../../components/picture/Picture'

// Import image
import silverMarker from '../../../assets/images/img-icon-silver.png'
import goldenMarker from '../../../assets/images/img-icon-golden.png'
import vipMarker from '../../../assets/images/img-icon-vip.png'
import presidentMarker from '../../../assets/images/img-icon-president.png'
import iconSkiper from '../../../assets/images/icon-skiper-end.png'

// Import hooks
import { usePubnub } from '../../hooks/usePubnub'

// Import containers
import ListOfCategoryServices from '../../containers/ListOfCategoryServices'

// Import utils
import { getPixelSize } from '../../utils/Pixel'
import { routeDirection } from '../../utils/Directions'
import TravelTracingScreen from './TravelTracingScreen'

const { height, width } = Dimensions.get('window')

const ModalLoader = () => {
  return (
    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50%' }}>
      <Loader color={Theme.COLORS.colorSecondary} />
    </View>
  )
}

const TransportScreen = props => {
  const dispatch = useDispatch()
  const { location } = useWatchLocation()
  const { firstName } = useSelector(state => state.user)
  const { directions } = useSelector(state => state.direction)
  const [isVisible, setIsVisible] = useState(false)
  const [destination, setDestination] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { silver, golden, vip, president } = usePubnub()

  const mapView = useRef(null)
  // Funcion que destruye el viaje marcado en cache
  const destroyMarkedTravel = async () => {
    setDestination(null)

    await dispatch({
      type: REMOVEDIRECTION
    })
    props.navigation.pop()

    return true
  }

  const detroyTravelAnimation = async () => {
    setDestination(null)
    await dispatch({
      type: REMOVEDIRECTION
    })
    centerToLocation()

    return true
  }

  const listMemo = useMemo(() => {
    return (
      <ListOfCategoryServices 
        location={location}
        navigation={props.navigation}
      />
    )
  }, [location])

  // Cuando vamos retrosedemos en la pantalla
  // destruimos el viaje en cache
  useEffect(() => {
    const id = BackHandler.addEventListener('hardwareBackPress', destroyMarkedTravel)
    return () => {
      if (id) {
        id.remove()
      }
    }
  }, [])

  const handleDirecctions = (placeId, details) => {
    setIsLoading(true)

    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const { pointCoords, steps } = await routeDirection(placeId, latitude, longitude)

        if (pointCoords === null || steps === null) {
          Alert.alert(
            'Atencion',
            'La conexion ha fallado',
            [
              {
                text: 'Ok',
                style: 'default',
                onPress: () => { }
              },
              {
                text: 'Reintentar',
                style: 'default',
                onPress: () => handleDirecctions(placeId, details)
              }
            ]
          )
        } else {
          setIsLoading(false)
          setDestination(pointCoords)
          dispatch({
            type: DIRECTION,
            payload: {
              steps
            }
          })
          mapView.current.fitToCoordinates(pointCoords, {
            edgePadding: {
              right: getPixelSize(50),
              left: getPixelSize(50),
              top: getPixelSize(100),
              bottom: getPixelSize(250)
            }
          })
        }
      }, error => {
        if (error) return <Error title='Error' description='Oh no, ocurrio un error al momento de obtener tu ubicacion, intente de nuevo o mas tarde.' />
        setError(true)
      }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 20 }
    )
  }

  const centerToLocation = () => {
    mapView.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: location.latitudeDelta,
      longitudeDelta: location.longitudeDelta
    });
  }

  // Verificamos si hay un lugar marcado 
  // Este dato lo obtenemos desde el cache de redux
  // BUG ACA - CUANDO SE MARCA EN ESTADOS UNIDOS
  useEffect(() => {
    if (directions !== null) {
      const { placeId, address } = directions
      handleDirecctions(placeId, address)
    }
  }, [directions])

  return (
    <View style={styles.screen}>
      <ModalTransport navigation={props.navigation} isVisible={isVisible} setIsVisible={setIsVisible} location={location} />

      {
        // Si ya cargo los datos, renderizamos el mapa
        location.latitude &&
        <Map mapView={mapView} location={location} centerLocation={destination ? false : true}>
          {
            // Renderizamos todos los conductores silver
            silver &&
            silver.map(
              (drive, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: drive.state.coords.latitude,
                    longitude: drive.state.coords.longitude
                  }}
                  title={`${drive.state.firstname} ${drive.state.lastname}`}
                  description='SILVER'>
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      resizeMode: 'contain'
                    }}
                    source={silverMarker}
                  />
                </Marker>
              )
            )
          }

          {
            // Renderizamos todos los conductores golden
            golden &&
            golden.map(
              (drive, index) => (
                <Marker
                  style={styles.marker}
                  key={index}
                  coordinate={{
                    latitude: drive.state.coords.latitude,
                    longitude: drive.state.coords.longitude
                  }}
                  title={`${drive.state.firstname} ${drive.state.lastname}`}
                  description='GOLDEN'
                >
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      resizeMode: 'contain'
                    }}
                    source={goldenMarker}
                  />
                </Marker>
              ))
          }

          {
            // Renderizamos todos los conductores vip
            vip &&
            vip.map(
              drive => (
                <Marker
                  style={styles.marker}
                  key={drive.uuid}
                  coordinate={{
                    latitude: drive.state.coords.latitude,
                    longitude: drive.state.coords.longitude
                  }}
                  title={`${drive.state.firstname} ${drive.state.lastname}`}
                  description='VIP'
                >
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      resizeMode: 'contain'
                    }}
                    source={vipMarker}
                  />
                </Marker>
              )
            )
          }

          {
            // Renderizamos todos los president
            president && (
              president.map(
                (drive, index) => (
                  <Marker
                    style={styles.marker}
                    key={index}
                    coordinate={{
                      latitude: drive.state.coords.latitude,
                      longitude: drive.state.coords.longitude
                    }}
                    title={`${drive.state.firstname} ${drive.state.lastname}`}
                    description='PRESIDENT'
                  >
                    <Image
                      style={{
                        width: 35,
                        height: 35,
                        resizeMode: 'contain'
                      }}
                      source={presidentMarker}
                    />
                  </Marker>
                )
              )
            )
          }

          {
            // Si hay destino, dibujamos la linea de recorrido
            destination &&
            <>
              <Polyline
                coordinates={destination}
                strokeWidth={3}
                strokeColor={Theme.COLORS.colorSecondary}
              />

              {/* {
                (avatar && destination[0]) &&
                <Marker coordinate={{ latitude: destination[0].latitude, longitude: destination[0].longitude }}>
                  <View style={styles.markerUser}>
                    <Icon name="map-marker" color="#FFF" size={RFValue(80)} />
                    <Image source={{ uri: avatar }} style={styles.markerImage} />
                  </View>
                </Marker>
              } */}

              {
                destination.length &&
                <Marker coordinate={{ latitude: destination[destination.length - 1].latitude, longitude: destination[destination.length - 1].longitude }}>
                  <Image source={iconSkiper} style={styles.markerEnd} />
                </Marker>
              }
            </>
          }
        </Map>

      }

      {
        // Si hay destino, renderizar boton de atras y precios
        destination &&
        <>
          <Button
            onPress={detroyTravelAnimation}
            iconName='arrow-back'
            iconSize={30}
            stylesButton={styles.buttonBack}
            iconColor={Theme.COLORS.colorSecondary}
          />
          
          {listMemo}
        </>
      }

      {
        // Si esta cargando y no hay destino
        // mostramos el loader
        (isLoading && !destination) &&
        <ModalLoader />
      }

      {
        // Renderizamos barra de busqueda
        !destination &&
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={styles.containerInput}>
          <View pointerEvents='none'>
            <InputControl
              stylesContainer={styles.container}
              stylesInput={styles.input}
              placeholder={`${firstName} ¿Donde quieres ir?`}
              placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              iconName='search'
            />
          </View>
        </TouchableOpacity>
      }

      <Picture
        source={require('../../../assets/images/img-logo-alysystem.png')}
        styles={styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Theme.COLORS.colorMainAlt
  },
  fixed: {
    backgroundColor: Theme.COLORS.colorMainDark,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    flexDirection: 'row'
  },
  fixedText: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.xsmall,
    color: Theme.COLORS.colorParagraph
  },
  containerInput: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: '100%',
    paddingHorizontal: 20
  },
  input: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 50,
    paddingVertical: 10,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  buttonBack: {
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.05,
    zIndex: 101
  },
  logo: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    resizeMode: 'contain',
    height: 30,
    width: 100
  },
  markerUser: {
    position: 'relative',
    marginTop: RFValue(-20),
  },
  markerImage: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(25),
    resizeMode: 'cover',
    position: 'absolute',
    top: RFValue(12),
    left: '25%',
  },
  markerEnd: {
    width: RFValue(40),
    height: RFValue(40),
    resizeMode: 'cover',
  },
})


const DecisionView = props => {
  const [travel, setTravel] = useState(true)
  // useQuery(COMPROBATETRAVEL, {
  //   onCompleted: async (data) => {
  //     console.log(data)
  //     // if (getTravelByUserId !== null) {
  //     //   setTravel(true)
  //     //   await AsyncStorage.setItem('travel', 'true')
  //     // }
  //     // else {
  //     //   setTravel(false)
  //     //   await AsyncStorage.removeItem('travel')
  //     // }
  //   }
  // })


  const comprobateTravel = async () => {
    const e = await AsyncStorage.getItem('travel')

    if (e && e === 'true') {
      setTravel(true)
    } else {
      setTravel(false)
    }
  }

  useEffect(() => {
    comprobateTravel()
  }, [])


  if (travel) {
    return <TravelTracingScreen {...props} />
  } else {
    return <TransportScreen {...props} />
  }
}

export default DecisionView
