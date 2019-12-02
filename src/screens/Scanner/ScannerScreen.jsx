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
  const [TravelTracing, { loading }] = useMutation(TRAVELTRACING)
  useEffect(() => {
    const verifyPermission = async () => {
      await permissionCamera()
    }
    verifyPermission()
  }, [])

  // if (error) {
  //   console.log(error)
  //   showMessage({
  //     message: 'AlySkiper',
  //     description: 'Ya se ha confirmado el viaje, no necesita volver a ingresar el codigo de confirmacion.',
  //     backgroundColor: 'green',
  //     color: '#fff',
  //     duration: 8000,
  //     icon: 'success',
  //     titleStyle: {
  //       fontFamily: 'Lato-Bold'
  //     },
  //     textStyle: {
  //       fontFamily: 'Lato-Regular'
  //     }
  //   })
  // }

  const handleOnReadyCode = async event => {
    Vibration.vibrate(1000)
    const scannerQR = event.nativeEvent.codeStringValue.split(' ')
    const idTravel = parseInt(scannerQR[0])
    const idUser = parseInt(scannerQR[1])
    console.log(idUser, idTravel, latitude, longitude)

    if (idUser !== userId) {
      showMessage({
        message: 'Error',
        description: 'No se ha podido confirmar el viaje, porque la cuenta de usuario no es valida.',
        backgroundColor: 'red',
        color: '#fff',
        duration: 8000,
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

    TravelTracing({ variables: { input: { idtravel: idTravel, idtravelstatus: 'CONFIRMADO', lat: latitude, lng: longitude } } })
      .then(result => {
        const { data } = result
        const id = data.registerTravelsTracing.id
        if (id !== null || id !== undefined) {
          showMessage({
            message: 'AlySkiper',
            description: 'El codigo se ha verificado correctamente.',
            backgroundColor: 'green',
            color: '#fff',
            icon: 'success',
            duration: 8000,
            titleStyle: {
              fontFamily: 'Lato-Bold'
            },
            textStyle: {
              fontFamily: 'Lato-Regular'
            }
          })
          navigate('TravelTrancing')
        }
      })
      .catch(error => {
        if (error) {
          showMessage({
            message: 'Error',
            description: 'No se ha podido generar el viaje, por favor pongase en contacto con soporte.',
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
        }
      })
  }

  const handleOnSubmit = async () => {
    const result = codeQR.split('-')
    const idTravel = parseInt(result[0])
    const idUser = parseInt(result[1])

    if (idUser !== userId) {
      showMessage({
        message: 'Error',
        description: 'No se ha podido confirmar el viaje, porque la cuenta de usuario no es valida.',
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

    TravelTracing({
      variables: {
        input: {
          idtravel: idTravel,
          idtravelstatus: 'CONFIRMADO',
          lat: latitude,
          lng: longitude
        }
      }
    })
      .then(result => {
        const { data } = result
        const id = data.registerTravelsTracing.id
        if (id !== null || id !== undefined) {
          showMessage({
            message: 'AlySkiper',
            description: 'El codigo se ha verificado correctamente.',
            backgroundColor: 'green',
            color: '#fff',
            icon: 'success',
            duration: 8000,
            titleStyle: {
              fontFamily: 'Lato-Bold'
            },
            textStyle: {
              fontFamily: 'Lato-Regular'
            }
          })
          return navigate('TravelTrancing')
        }
      })
      .catch(error => {
        console.log(error, 'error')
        if (error) {
          showMessage({
            message: 'Error',
            description: 'No se ha podido generar el viaje, por favor pongase en contacto con soporte.',
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
        }
      })
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
