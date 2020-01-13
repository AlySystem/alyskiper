import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  BackHandler
} from "react-native"
import { Marker, Callout } from "react-native-maps"
import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import { useSelector, useDispatch } from "react-redux"
import PubNubReact from "pubnub-react"
import { showMessage } from 'react-native-flash-message'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AsyncStorage from "@react-native-community/async-storage"
import { getPreciseDistance } from 'geolib'

// Import actions
import { DETAILSTRAVEL } from "../../store/actionTypes"

// Import components
import Loader from "../../components/loader/Loader"
import Modal from "../../components/modal/Modal"
import DetailsDrive from "../../components/details/DetailsDrive"
import Button from "../../components/button/Button"
import { Map } from "../../components/map/MapView"
import Picture from "../../components/picture/Picture"
import IconFont from "react-native-vector-icons/FontAwesome5"
import ButtonSupport from '../../components/button/ButtonSupport'
import Background from '../../components/background/Background'

// Import custom hooks
import { useNotification } from "../../hooks/useNotification"
import { useWatchLocation } from "../../hooks/useWatchLocation"

// Import query
import { GETTRAVELBYUSERID } from "../../graphql/querys/Querys"
import { TRAVELTRACING } from "../../graphql/mutations/Mutations"

// Import theme
import { Theme } from "../../constants/Theme"
import { RFValue } from "react-native-responsive-fontsize"

const TravelTracingScreen = props => {
  const dispatch = useDispatch()
  const { navigate } = props.navigation
  const { userId, firstName } = useSelector(state => state.user)
  const { location } = useWatchLocation()
  const [status, setStatus] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [errorTravel, setErrorTravel] = useState(false)
  const [showCancel, setCancel] = useState(false)
  const [driver, setDriver] = useState()
  const { id } = useSelector(state => state.status)
  const [destroy, setDestroy] = useState(false)
  const [idTravel] = useState(props.navigation.getParam("idTravel"))
  const [TravelTracing] = useMutation(TRAVELTRACING, {
    onError: (error) => {
      showMessage({
        message: 'Opss',
        description: 'Ocurrio un error, intente de nuevo o mas tarde.',
        backgroundColor: 'red',
        color: '#fff',
        icon: 'danger',
        duration: 4000,
        titleStyle: {
          fontFamily: 'Lato-Bold'
        },
        textStyle: {
          fontFamily: 'Lato-Regular'
        }
      })
    },
    onCompleted: () => {
      return navigate("Home")
    }
  })
  const [GetTravelByUserId, { data, loading }] = useLazyQuery(
    GETTRAVELBYUSERID,
    {
      fetchPolicy: "no-cache",
      onCompleted: (dataResponse) => {
        if (dataResponse.getTravelByUserId === null) {
          AsyncStorage.removeItem('travel')
          setErrorTravel(true)
        } else {
          if (dataResponse.getTravelByUserId.skiperTravelsTracing[0].travelstatus.id === 3) {
            setCancel(true)
          } else {
            setCancel(false)
          }
          AsyncStorage.setItem('travel', 'true')
        }
      }
    },
  )
  let interval = null
  const mapView = useRef(null)
  const markerRef = useRef(null)
  useNotification(navigate, location.latitude, location.longitude, props.navigation)

  const pubnub = new PubNubReact({
    publishKey: 'pub-c-79890746-813e-461c-8a18-c33bd2309b50',
    subscribeKey: 'sub-c-3a83e92a-35b2-11ea-81d4-f6d34a0dd71d',
    subscribeRequestTimeout: 60000,
    presenceTimeout: 20,
    uuid: `${firstName}${userId}`
  })

  const handleToggleModal = () =>  setShowDetails(!showDetails)

  useEffect(() => {
    GetTravelByUserId({ variables: { iduser: userId } })

    const HandledBackEvent = BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.popToTop()
      // console.log('test')
      return true
    })

    return () => {
      HandledBackEvent.remove()
    }
  }, [])

  useEffect(() => {
    if (location.loading) {
      if (!destroy) {
        if (mapView.current !== null) {
          mapView.current.animateToRegion(location, 2000)
          setDestroy(true)
        }
      }
    }
  }, [location])

  useEffect(() => {
    if (data && data.getTravelByUserId !== null) {
      setErrorTravel(false)
      setStatus(data.getTravelByUserId.skiperTravelsTracing[0].travelstatus.id)
      dispatch({
        type: DETAILSTRAVEL,
        payload: {
          drive: data.getTravelByUserId
        }
      })
      pubnub.subscribe({
        channels: [`Driver_${idTravel || data.getTravelByUserId.id}`],
        withPresence: true
      })

      interval = setInterval(() => {
        pubnub.hereNow({ includeUUIDs: true, includeState: true, channels: [`Driver_${idTravel || data.getTravelByUserId.id}`] }, (status, response) => {
          if (response !== undefined) {
            if (`Driver_${idTravel || data.getTravelByUserId.id}` in response.channels) {
              const channels = response.channels[`Driver_${idTravel || data.getTravelByUserId.id}`]
              if (channels !== undefined) {
                const _drive = channels.occupants.filter(item => item.state !== undefined)
                if (markerRef.current !== null) {
                  markerRef.current.showCallout()
                }
                setDriver(_drive)
              }
            }
          }
        })
      }, 1000)
    }
    return () => {
      if (interval !== null) {
        clearInterval(interval)
      }
    }
  }, [data])

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: Theme.COLORS.colorMainAlt, justifyContent: "center", alignItems: "center" }}>
        <Loader />
        <View style={{ paddingVertical: 10 }} />
        <Text style={{ color: Theme.COLORS.colorParagraph, fontFamily: "Lato-Bold", fontSize: Theme.SIZES.normal }}>
          Cargando...
        </Text>
      </View>
    )
  }

  const cancelTrip = () => {
    Alert.alert(
      "Cancelar Viaje",
      "¿Esta seguro de cancelar tu viaje? Esta cancelacion tendra un costo adicional al siguiente viaje",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => { }
        },
        {
          text: "Si, Cancelar",
          style: "default",
          onPress: () => {
            const variables = {
              input: {
                idtravel: idTravel || data.getTravelByUserId.id,
                idtravelstatus: "CANCELADO",
                lat: location.latitude,
                lng: location.longitude
              }
            }

            TravelTracing({ variables })
          }
        }
      ])
  }

  if (errorTravel) {
    return (
      <Background>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,.5)',
            width: "100%",
            height: "100%",
            flex: 1,
            zIndex: 1000,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            iconName="close"
            stylesButton={{ position: "absolute", top: 8, left: 10 }}
            iconSize={40}
            onPress={() => props.navigation.goBack()}
          />
          <Picture source={require("../../../assets/images/img-alyskiper.png")} />
          <View style={{ paddingVertical: 10 }} />
          <Text style={{ color: Theme.COLORS.colorParagraph, fontFamily: "Lato-Bold", fontSize: Theme.SIZES.normal }} >
            No hay viajes activos
          </Text>
        </View>
      </Background>
    )
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: Theme.COLORS.colorMainAlt }}>
        <Modal
          isVisible={showDetails}
          backdropColor="#B4B3DB"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', margin: 0, justifyContent: "flex-start" }}
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <DetailsDrive drive={data} />
          <Button
            iconName="close"
            iconSize={30}
            onPress={handleToggleModal}
            stylesButton={{ position: "absolute", top: 10, left: 12 }}
          />
        </Modal>
        <Map mapView={mapView} location={location} markerUser centerLocation>
          {driver &&
            driver.map(drive => {
              return (
                <Marker
                  ref={markerRef}
                  key={`${drive.uuid}${drive.state.lastname}`}
                  coordinate={{  latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }}
                  title={`${drive.state.firstname} ${drive.state.lastname}`}
                  description={`esta a ${getPreciseDistance({ latitude: location.latitude, longitude: location.longitude }, { latitude: driver[0].state.coords.latitude, longitude: driver[0].state.coords.longitude })} metros`}
                >
                  <View style={styles.containerMarker}>
                    <View style={styles.subContainerMarker}>
                      <Image style={styles.drive} source={require("../../../assets/images/img-travel.png")} />
                    </View>
                  </View>
                </Marker>
              )
            })
          }
        </Map>
  
        <ButtonSupport right='70%' bottom='18%' />
        {status === 4 || id === 4 ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
              top: 15,
              width: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => navigate("Scanner", { latitude: location.latitude, longitude: location.longitude })}
          >
            <Icon name="qrcode-scan" size={40} color={Theme.COLORS.colorSecondary} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.containerButton} onPress={handleToggleModal}>
          <View style={{ backgroundColor: Theme.COLORS.colorSecondary, borderRadius: 100, width: 100, height: 8 }} />
          <Text allowFontScaling={false} style={styles.text}>
            Toca para mostrar detalles
          </Text>
        </TouchableOpacity>
  
        {status === 3 || id === 3 ? (
          <TouchableOpacity style={styles.buttonCancel} onPress={cancelTrip}>
            <IconFont name="car" size={18} color={Theme.COLORS.colorSecondary} />
            <Text style={{ color: Theme.COLORS.colorSecondary }}>
              Cancelar Viaje
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  containerButton: {
    position: "relative",
    bottom: 0,
    left: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    height: 70,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,.8)"
  },
  text: {
    fontFamily: "Lato-Regular",
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal
  },
  drive: {
    width: RFValue(25),
    height: RFValue(25),
    resizeMode: "contain"
  },
  containerMarker: {
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // padding: RFValue(10),
    // borderRadius: RFValue(25),
  },
  subContainerMarker: {
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // padding: RFValue(10),
    // borderRadius: RFValue(50),
  },
  buttonCancel: {
    alignItems: "center",
    backgroundColor: Theme.COLORS.colorMainDark,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 1,
    elevation: 10,
    borderRadius: 25,
    flexDirection: "row",
    position: "absolute",
    top: 10,
    left: 10,
    height: 50,
    width: 170,
    justifyContent: "space-around",
    paddingHorizontal: 18
  }
})

export default TravelTracingScreen
