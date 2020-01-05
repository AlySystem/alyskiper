import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  BackHandler,
  Image,
  Alert,
  AsyncStorage
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Polyline, Marker } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service'

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

// Import image
import silverMarker from '../../../assets/images/img-icon-silver.png'
import goldenMarker from '../../../assets/images/img-icon-golden.png'
import vipMarker from '../../../assets/images/img-icon-vip.png'
import presidentMarker from '../../../assets/images/img-icon-president.png'

// Import hooks
import { usePubnub } from '../../hooks/usePubnub'

// Import containers
import ListOfCategoryServices from '../../containers/ListOfCategoryServices'

// Import utils
import { getPixelSize } from '../../utils/Pixel'
import { routeDirection } from '../../utils/Directions'
import Picture from '../../components/picture/Picture'
import TravelTracingScreen from './TravelTracingScreen'
import pubnubReact from 'pubnub-react'
import { keys } from '../../utils/keys'

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
  // const { silver, golden, vip, president } = usePubnub()

  const allChanels = [`${keys.channels.drivers.silver}`, `${keys.channels.drivers.golden}`, `${keys.channels.drivers.vip}`, `${keys.channels.drivers.president}`]

  const pubnub = new pubnubReact({
    publishKey: 'pub-c-2ed1b9dc-e811-411f-99f5-01a3addeda39',
    subscribeKey: 'sub-c-8a28b1d0-28d4-11ea-894a-b6462cb07a90',
    // subscribeRequestTimeout: 60000,
    // presenceTimeout: 20,
    uuid: firstName
  })

  // Creamos estados para todas las categoria
  // para todos los skiper
  const [silver, setSilver] = useState([])
  const [golden, setGolden] = useState([])
  const [vip, setVip] = useState([])
  const [president, setpresident] = useState([])

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

  useEffect(() => {
    pubnub.subscribe({
      channels: allChanels,
      withPresence: true
    })

    const rastrear = setInterval(() => {
      pubnub.hereNow({ includeUUIDs: true, includeState: true, channels: allChanels }, (status, response) => {
        console.log(response)

        if (response !== undefined) {
          if ('SkiperDrive_1' in response.channels) {
            const silverChannel = response.channels.SkiperDrive_1
            if (silverChannel !== undefined) {
              setSilver(silverChannel.occupants.filter(item => item.state !== undefined))
            }
          }

          if ('SkiperDrive_2' in response.channels) {
            const goldenChannel = response.channels.SkiperDrive_2
            if (goldenChannel !== undefined) {
              setGolden(goldenChannel.occupants.filter(item => item.state !== undefined))
            }
          }

          if ('SkiperDrive_3' in response.channels) {
            const vipChannel = response.channels.SkiperDrive_3
            if (vipChannel !== undefined) {
              setVip(vipChannel.occupants.filter(item => item.state !== undefined))
            }
          }

          if ('SkiperDrive_4' in response.channels) {
            const presidentChannel = response.channels.SkiperDrive_4
            if (presidentChannel !== undefined) {
              setpresident(presidentChannel.occupants.filter(item => item.state !== undefined))
            }
          }

          dispatch({
            type: DRIVERS,
            payload: {
              silver,
              golden,
              vip,
              president
            }
          })
        }
      })
    }, 1000)

    return () => {
      clearInterval(rastrear)
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
              top: getPixelSize(50),
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
        <Map mapView={mapView} location={location}>
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
                  description='SILVER'
                >
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
            <Polyline
              coordinates={destination}
              strokeWidth={3}
              strokeColor={Theme.COLORS.colorSecondary}
            />
          }
        </Map>

      }

      {
        // Si hay destino, renderizar boton de atras y precios
        destination &&
        <>
          <Button
            onPress={destroyMarkedTravel}
            iconName='arrow-back'
            iconSize={30}
            stylesButton={styles.buttonBack}
            iconColor={Theme.COLORS.colorParagraph}
          />
          <ListOfCategoryServices
            location={location}
            navigation={props.navigation}
          />
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
  container: {

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
    left: width * 0.05
  },
  logo: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    resizeMode: 'contain',
    height: 30,
    width: 100
  }
})


const DecisionView = props => {
  const [travel, setTravel] = useState(true)

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
  })

  if (travel) {
    return <TravelTracingScreen {...props} />
  } else {
    return <TransportScreen {...props} />
  }
}

export default DecisionView
