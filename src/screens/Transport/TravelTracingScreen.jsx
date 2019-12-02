import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import { Marker } from 'react-native-maps'
import { useQuery } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import PubNubReact from 'pubnub-react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Import actions
import { DETAILSTRAVEL } from '../../store/actionTypes'

// Import components
import Loader from '../../components/loader/Loader'
import Modal from '../../components/modal/Modal'
import DetailsDrive from '../../components/details/DetailsDrive'
import Button from '../../components/button/Button'
import { Map } from '../../components/map/MapView'
import Picture from '../../components/picture/Picture'

// Import custom hooks
import { useNotification } from '../../hooks/useNotification'
import { useLocation } from '../../hooks/useLocation'

// Import query
import { GETTRAVELBYUSERID } from '../../graphql/querys/Querys'

// Import theme
import { Theme } from '../../constants/Theme'

const TravelTracingScreen = props => {
  const dispatch = useDispatch()
  const { navigate } = props.navigation
  const { travel } = useSelector(state => state.activeTravel)
  const { userId, firstName } = useSelector(state => state.user)
  const { location } = useLocation()
  const [showDetails, setShowDetails] = useState(false)
  const [errorTravel, setErrorTravel] = useState(false)
  const [connectionDriver, setConnectionDriver] = useState(false)
  const [driver, setDriver] = useState()
  const [idTravel] = useState(props.navigation.getParam('idTravel'))
  const { data, loading } = useQuery(GETTRAVELBYUSERID, { variables: { iduser: userId } })

  const mapView = useRef(null)
  const marker = useRef(null)
  useNotification(navigate, location.latitude, location.longitude)

  const pubnub = new PubNubReact({
    publishKey: 'pub-c-bd68b062-738a-44e5-91a1-cfdab437d40f',
    subscribeKey: 'sub-c-41661912-108b-11ea-9132-cacb72695e2d',
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122,
    uuid: `${firstName}${userId}`
  })

  useEffect(() => {
    if (!loading) {
      if (travel !== null) {
        setErrorTravel(false)
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

        pubnub.hereNow({
          includeUUIDs: true,
          includeState: true,
          channels: [`Driver_${idTravel || data.getTravelByUserId.id}`]
        },

        function (status, response) {
          if (response !== undefined) {
            if (`Driver_${idTravel || data.getTravelByUserId.id}` in response.channels) {
              const channels = response.channels[`Driver_${idTravel || data.getTravelByUserId.id}`]
              if (channels !== undefined) {
                const drive = channels.occupants.filter(item => item.state !== undefined)
                setConnectionDriver(false)
                setDriver(drive)
                if (marker.current !== null) {
                  console.log('DRIVING... ', drive[0].state.coords.latitude, drive[0].state.coords.longitude)
                  marker.current._component.animateMarkerToCoordinate({ latitude: drive[0].state.coords.latitude, longitude: drive[0].state.coords.longitude }, 500)
                }
              }
            }
          } else {
            setConnectionDriver(true)
          }
        })
      } else {
        setErrorTravel(true)
      }
    }
  }, [loading, driver])

  const handleToggleModal = () => {
    setShowDetails(!showDetails)
  }

  if (loading) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: Theme.COLORS.colorMainAlt,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Loader />
        <View style={{ paddingVertical: 10 }} />
        <Text style={{
          color: Theme.COLORS.colorParagraph,
          fontFamily: 'Lato-Bold',
          fontSize: Theme.SIZES.normal
        }}
        >Cargando...
        </Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: Theme.COLORS.colorMainAlt }}>
      <Modal
        isVisible={showDetails}
        backdropColor='#B4B3DB'
        style={{
          backgroundColor: 'rgba(0,0,0,.8)',
          margin: 0,
          justifyContent: 'flex-start'
        }}
        backdropOpacity={0.8}
        animationIn='zoomInDown'
        animationOut='zoomOutUp'
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <DetailsDrive drive={data} />
        <Button
          iconName='close'
          iconSize={30}
          onPress={handleToggleModal}
          stylesButton={{
            position: 'absolute',
            top: 10,
            left: 12
          }}
        />
      </Modal>
      {location.latitude && (
        <Map mapView={mapView} location={location}>
          {driver && (
            driver.map(drive => {
              return (
                <Marker.Animated
                  ref={marker}
                  key={`${drive.uuid}${drive.state.lastname}`}
                  coordinate={{
                    latitude: drive.state.coords.latitude,
                    longitude: drive.state.coords.longitude
                  }}
                >
                  <Image
                    style={styles.drive}
                    source={require('../../../assets/images/img-icon-silver.png')}
                  />
                </Marker.Animated>
              )
            })
          )}
        </Map>
      )}
      {
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 15,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => navigate('Scanner', { latitude: location.latitude, longitude: location.longitude })}
        >
          <Icon
            name='qrcode-scan'
            size={40}
            color={Theme.COLORS.colorSecondary}
          />
        </TouchableOpacity>
      }
      {connectionDriver && (
        <Text style={{
          position: 'absolute',
          bottom: 70,
          left: 0,
          width: '100%',
          backgroundColor: 'red',
          paddingVertical: 5,
          textAlign: 'center',
          fontFamily: 'Lato-Bold',
          color: Theme.COLORS.colorParagraph
        }}
        >EL CONDUCTOR SE DESCONECTO
        </Text>
      )}
      <TouchableOpacity
        style={styles.containerButton}
        onPress={handleToggleModal}
      >
        <View
          style={{
            backgroundColor: Theme.COLORS.colorSecondary,
            borderRadius: 100,
            width: 100,
            height: 8
          }}
        />
        <Text allowFontScaling={false} style={styles.text}>Toca para mostrar detalles</Text>
      </TouchableOpacity>
      {errorTravel && (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,.8)',
            width: '100%',
            height: '100%',
            flex: 1,
            zIndex: 100,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button
            iconName='close'
            stylesButton={{
              position: 'absolute',
              top: 8,
              left: 10
            }}
            iconSize={40}
            onPress={() => props.navigation.goBack()}
          />
          <Picture
            source={require('../../../assets/images/img-alyskiper.png')}
          />
          <View style={{ paddingVertical: 10 }} />
          <Text style={{
            color: Theme.COLORS.colorParagraph,
            fontFamily: 'Lato-Bold',
            fontSize: Theme.SIZES.normal
          }}
          >No hay viajes activos
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containerButton: {
    position: 'relative',
    bottom: 0,
    left: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    height: 70,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  text: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal
  },
  drive: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  }
})

export default TravelTracingScreen
