import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import components
import Loader from '../../components/loader/Loader'
import Modal from '../../components/modal/Modal'
import DetailsDrive from '../../components/details/DetailsDrive'
import Button from '../../components/button/Button'

// Import query
import { GETTRAVELBYUSERID } from '../../graphql/querys/Querys'

// Import theme
import { Theme } from '../../constants/Theme'

const TravelTracingScreen = props => {
  const { userId } = useSelector(state => state.user)
  const location = useSelector(state => state.location)
  const [showDetails, setShowDetails] = useState(false)
  const { data, loading } = useQuery(GETTRAVELBYUSERID, { variables: { iduser: userId } })
  const mapView = useRef(null)

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
        <Text>Cargando viaje...</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
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
          drive={data.getTravelByUserId}
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
      />
      <TouchableOpacity
        style={styles.containerButton}
        onPress={handleToggleModal}
      >
        <Text allowFontScaling={false} style={styles.text}>Toca para mostrar detalles</Text>
      </TouchableOpacity>
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
