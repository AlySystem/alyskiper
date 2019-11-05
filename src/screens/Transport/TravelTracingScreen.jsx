import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import PubNubReact from 'pubnub-react'

// Import components
import Loader from '../../components/loader/Loader'
import Modal from '../../components/modal/Modal'
import DetailsDrive from '../../components/details/DetailsDrive'
import Button from '../../components/button/Button'

// Import query
import { GETTRAVELBYUSERID } from '../../graphql/querys/Querys'

// Import theme
import { Theme } from '../../constants/Theme'
import Picture from '../../components/picture/Picture'

const TravelTracingScreen = props => {
  const { userId, firstName } = useSelector(state => state.user)
  const location = useSelector(state => state.location)
  const [showDetails, setShowDetails] = useState(false)
  const [errorTravel, setErroTravel] = useState(false)
  const [driver, setDriver] = useState()
  const [idTravel] = useState(props.navigation.getParam('idTravel'))
  const { data, loading } = useQuery(GETTRAVELBYUSERID, { variables: { iduser: userId } })
  const mapView = useRef(null)

  const pubnub = new PubNubReact({
    publishKey: 'pub-c-b5350d6e-9a1f-4d33-b5c9-918fe9bff121',
    subscribeKey: 'sub-c-e286360e-fdc3-11e9-be22-ea7c5aada356',
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122,
    uuid: firstName
  })

  useEffect(() => {
    if (!loading) {
      if (data !== null && data !== undefined) {
        pubnub.subscribe({
          channels: [`Driver_${idTravel || data.getTravelByUserId.id}`],
          // channels: [`Driver_${idTravel}`],
          withPresence: true
        })

        pubnub.hereNow({
          includeUUIDs: true,
          includeState: true,
          channels: [`Driver_${idTravel || data.getTravelByUserId.id}`]
          // channels: [`Driver_${idTravel}`]
        },

        function (status, response) {
          console.log(response)
        })

        pubnub.addListener({
          status: function (statusEvent) {

          },
          message: function (message) {

          },
          presence: function (presenceEvent) {
            // console.log(presenceEvent)
          }
        })

        return () => {
          pubnub.unsubscribe({
            channels: [`Driver_${idTravel || data.getTravelByUserId.id}`]
            // channels: [`Driver_${idTravel}`]
          })
        }
      } else {
        setErroTravel(true)
      }
    }
  }, [pubnub, loading])

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
        >Cargando viaje...
        </Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: Theme.COLORS.colorMainAlt }}>
      <Modal
        isVisible={showDetails}
        backdropColor='#B4B3DB'
        backdropOpacity={0.8}
        animationIn='zoomInDown'
        animationOut='zoomOutUp'
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <DetailsDrive
          drive={data}
        />
        <Button
          iconName='close'
          iconSize={30}
          onPress={handleToggleModal}
        />
      </Modal>
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
        {/* {driver && (
          driver.map(drive => (
            <Marker
              style={styles.marker}
              key={drive.uuid}
              coordinate={{
                latitude: drive.state.coords.latitude,
                longitude: drive.state.coords.longitude
              }}
            >
              <Image
                style={styles.drive}
                source={require('../../../assets/images/img-icon-silver.png')}
              />
            </Marker>
          ))
        )} */}
      </MapView>
      <TouchableOpacity
        style={styles.containerButton}
        onPress={handleToggleModal}
      >
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Theme.COLORS.colorMainAlt
  },
  text: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal
  }
})

export default TravelTracingScreen
