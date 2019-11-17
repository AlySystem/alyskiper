import React, { useState, useEffect } from 'react'
import {
  View,
  Vibration,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { CameraKitCameraScreen } from 'react-native-camera-kit'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import utils
import { permissionCamera } from '../../utils/PermissionCamera'

// Import mutations
import { TRAVELTRACING } from '../../graphql/mutations/Mutations'

// Import components
import Loader from '../../components/loader/Loader'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'

// Import theme
import { Theme } from '../../constants/Theme'

const ScannerScreen = props => {
  const { navigate } = props.navigation
  const { userId } = useSelector(state => state.user)
  const latitude = props.navigation.getParam('latitude')
  const longitude = props.navigation.getParam('longitude')
  const [manualQR, setManualQR] = useState(false)
  const [codeQR, setCodeQR] = useState('')
  const [TravelTracing, { loading, data }] = useMutation(TRAVELTRACING)

  useEffect(() => {
    const verifyPermission = async () => {
      await permissionCamera()
    }
    verifyPermission()
  }, [])

  const handleOnReadyCode = async event => {
    Vibration.vibrate(1000)
    const scannerQR = event.nativeEvent.codeStringValue.split(' ')
    const idTravel = scannerQR[0]
    const idUser = scannerQR[1]

    if (parseInt(idUser) !== userId) {
      showMessage({
        message: 'Error',
        description: 'No se ha podido generar el viaje, por favor pongase en contacto con soporte.',
        backgroundColor: 'red',
        color: '#fff',
        duration: 4000,
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
    TravelTracing({ variables: { input: { idtravel: parseInt(idTravel), idtravelstatus: 'CONFIRMADO', lat: latitude, lng: longitude } } })
  }

  const handleOnSubmit = () => {
    const result = codeQR.split(',')
    const idTravel = result[0]
    const idUser = result[1]
    if (idUser !== userId) {
      showMessage({
        message: 'Error',
        description: 'No se ha podido generar el viaje, por favor pongase en contacto con soporte.',
        backgroundColor: 'red',
        color: '#fff',
        duration: 4000,
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
    TravelTracing({ variables: { input: { idtravel: parseInt(idTravel), idtravelstatus: 'CONFIRMADO', lat: latitude, lng: longitude } } })
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
    <View style={{
      flex: 1,
      backgroundColor: Theme.COLORS.colorMainAlt
    }}
    >
      <TouchableOpacity
        style={{
          width: '100%',
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => setManualQR(!manualQR)}
      >
        <Text allowFontScaling={false} style={styles.text}>{manualQR ? 'ESCANEAR QR' : 'AGREGAR MANUAL'}</Text>
      </TouchableOpacity>
      {!manualQR && (
        <CameraKitCameraScreen
          style={{ flex: 1 }}
          showFrame
          scanBarcode
          frameColor={Theme.COLORS.colorSecondary}
          laserColor={Theme.COLORS.colorMainDark}
          colorForScannerFrame='black'
          onReadCode={handleOnReadyCode}
        />
      )}
      {manualQR && (
        <View style={{
          flex: 1,
          backgroundColor: Theme.COLORS.colorMainAlt,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20
        }}
        >
          <Text style={{
            color: Theme.COLORS.colorParagraph,
            fontFamily: 'Lato-Bold',
            fontSize: Theme.SIZES.small
          }}
          />
          <InputControl
            value={codeQR}
            setValue={setCodeQR}
            placeholder='Ingresa el codigo'
            placeholderTextColor={Theme.COLORS.colorParagraph}
            onChangeText={value => setCodeQR(value)}
            isActiveButton
          />
          <IconButton
            isActiveIcon
            message='CONFIRMAR'
            onPress={handleOnSubmit}
          />
        </View>
      )}
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
