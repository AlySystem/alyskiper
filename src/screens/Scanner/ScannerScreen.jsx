import React from 'react'
import {
  View,
  Vibration,
  Text,
  StyleSheet,
  Alert
} from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import mutations
import { TRAVELTRACING } from '../../graphql/mutations/Mutations'

// Import components
import Loader from '../../components/loader/Loader'

// Import theme
import { Theme } from '../../constants/Theme'

const ScannerScreen = props => {
  const { navigate } = props.navigation
  const { userId } = useSelector(state => state.user)
  const { latitude, longitude } = useSelector(state => state.location)
  const [TravelTracing, { data, loading }] = useMutation(TRAVELTRACING)

  const handleOnReadyCode = event => {
    Vibration.vibrate(1000)
    const codeQR = event.nativeEvent.codeStringValue.split(' ')
    const idTravel = codeQR[0]
    const idUser = codeQR[1]

    if (idUser !== userId) {
      Alert.alert('Hubo un error')
      return
    }
    TravelTracing({ variables: { input: { idtravel: idTravel, idtravelstatus: 5, lat: latitude, lng: longitude } } })
  }

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Loader />
        <View style={{ paddingVertical: 10 }} />
        <Text style={styles.text}>Confirmando viaje....</Text>
      </View>
    )
  }

  if (data) {
    navigate('TravelTracing')
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraKitCameraScreen
        style={{ flex: 1 }}
        showFrame
        scanBarcode
        frameColor={Theme.COLORS.colorSecondary}
        laserColor={Theme.COLORS.colorMainDark}
        colorForScannerFrame='black'
        onReadCode={handleOnReadyCode}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.normal
  }
})

export default ScannerScreen
