import React from 'react'
import {
  View,
  Vibration,
  Text,
  StyleSheet
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
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
  const [TravelTracing, { loading, data }] = useMutation(TRAVELTRACING)

  const handleOnReadyCode = async event => {
    Vibration.vibrate(1000)
    const codeQR = event.nativeEvent.codeStringValue.split(' ')
    const idTravel = codeQR[0]
    const idUser = codeQR[1]

    if (parseInt(idUser) !== userId) {
      showMessage({
        message: 'Error',
        description: 'No se ha podido generar el viaje',
        backgroundColor: 'red',
        color: '#fff',
        icon: 'danger',
        titleStyle: {
          fontFamily: 'Lato-Bold'
        },
        textStyle: {
          fontFamily: 'Lato-Regular'
        }
      })
      return
    }
    TravelTracing({ variables: { input: { idtravel: parseInt(idTravel), idtravelstatus: 5, lat: latitude, lng: longitude } } })
  }

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.COLORS.colorMainDark
      }}
      >
        <Loader />
        <View style={{ paddingVertical: 10 }} />
        <Text allowFontScaling={false} style={styles.text}>Confirmando viaje....</Text>
      </View>
    )
  }

  if (data) {
    const { registerTravelsTracing: { id } } = data
    if (id !== null || id !== undefined) {
      navigate('TravelTrancing')
    }
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
