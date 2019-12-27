import React, { useRef, useState, useEffect } from 'react'
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

// Import actions
import { REMOVEDIRECTION, DIRECTION } from '../../store/actionTypes'

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
// import AnimatedPolyline from '../../components/polyline/AnimtedPolyline'

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
// import { useNotification } from '../../hooks/useNotification'
import Picture from '../../components/picture/Picture'

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
  const { navigate } = props.navigation
  const { location, loading } = useWatchLocation()
  // useNotification(navigate, location.latitude, location.longitude, props.navigation)
  const { firstName } = useSelector(state => state.user)
  const { directions } = useSelector(state => state.direction)
  const [isVisible, setIsVisible] = useState(false)
  const [destination, setDestination] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { silver, golden, vip, president } = usePubnub()
  const [, setDetails] = useState('')

  // En estos marcadores crearemos un arreglo de referencias
  // Esto es debido a que se ocupa la misma referencia para muchos marcadores
  const markerSilver = useRef(null)
  const markerGolden = useRef(null)
  const markerVip = useRef(null)
  const markerPresident = useRef(null)

  const mapView = useRef(null)
  // Funcion que destruye el viaje marcado en cache
  const destroyMarkedTravel = () => {
    setDestination(null)

    dispatch({
      type: REMOVEDIRECTION
    })

    props.navigation.pop()

    return true
  }

  // Cuando vamos retrosedemos en la pantalla
  // destruimos el viaje en cache
  BackHandler.addEventListener('hardwareBackPress', destroyMarkedTravel)


  const handleDirecctions = async (placeId, details) => {
    setIsLoading(true)

    // Obtenemos la direccion Actual del usuario
    if (location.latitude) {
      const { latitude, longitude } = location

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
        setDetails(details)
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
    }
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

  useEffect(() => {
    if (silver) {
      if (markerSilver.current !== null) {
        silver.map(drive => {
          markerSilver.current._component.animateMarkerToCoordinate({ latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, 500)
          // const doAnimation = drive => {
          // }
          // doAnimation(drive)
        })
      }
    }

    if (golden) {
      if (markerGolden.current !== null) {
        golden.map(drive => {
          markerGolden.current._component.animateMarkerToCoordinate({ latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, 500)
          // const doAnimation = drive => {
          // }
          // doAnimation(drive)
        })
      }
    }

    if (vip) {
      if (markerVip.current !== null) {
        vip.map(drive => {
          markerVip.current._component.animateMarkerToCoordinate({ latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, 500)
          // const doAnimation = drive => {
          // }
          // doAnimation(drive)
        })
      }
    }

    if (president) {
      if (markerPresident.current !== null) {
        president.map(drive => {
          markerPresident.current._component.animateMarkerToCoordinate({ latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, 500)
          // const doAnimation = drive => {
          // }
          // doAnimation(drive)
        })
      }
    }
  }, [silver, golden, vip, president])

  return (
    <View style={styles.screen}>
      <ModalTransport navigation={props.navigation} isVisible={isVisible} setIsVisible={setIsVisible} location={location} />

      {
        // Si ya cargo los datos, renderizamos el mapa
        !loading &&
        <Map mapView={mapView} location={location}>
          {
            // Renderizamos todos los conductores silver
            silver &&
            silver.map(
              (drive, index) => (
                <Marker.Animated
                  key={index}
                  coordinate={{
                    latitude: drive.state.coords.latitude,
                    longitude: drive.state.coords.longitude
                  }}
                  ref={markerSilver}
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
                </Marker.Animated>
              )
            )
          }

          {
            // Renderizamos todos los conductores golden
            golden &&
            golden.map(
              (drive, index) => (
                <Marker.Animated
                  style={styles.marker}
                  key={index}
                  coordinate={{
                    latitude: drive.state.coords.latitude,
                    longitude: drive.state.coords.longitude
                  }}
                  ref={markerGolden}
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
                </Marker.Animated>
              ))
          }

          {
            // Renderizamos todos los conductores vip
            vip &&
            vip.map(
              drive => (
                <Marker.Animated
                  style={styles.marker}
                  key={drive.uuid}
                  coordinate={{
                    latitude: drive.state.coords.latitude,
                    longitude: drive.state.coords.longitude
                  }}
                  title={`${drive.state.firstname} ${drive.state.lastname}`}
                  description='VIP'
                  ref={markerVip}
                >
                  <Image
                    style={{
                      width: 35,
                      height: 35,
                      resizeMode: 'contain'
                    }}
                    source={vipMarker}
                  />
                </Marker.Animated>
              )
            )
          }

          {
            // Renderizamos todos los president
            president && (
              president.map(
                (drive, index) => (
                  <Marker.Animated
                    style={styles.marker}
                    key={index}
                    coordinate={{
                      latitude: drive.state.coords.latitude,
                      longitude: drive.state.coords.longitude
                    }}
                    ref={markerPresident}
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
                  </Marker.Animated>
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

export default TransportScreen
