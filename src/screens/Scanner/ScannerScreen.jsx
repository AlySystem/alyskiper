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
import { TextInputMask } from 'react-native-masked-text'
import Geolocation from 'react-native-geolocation-service'

// Import utils
import { permissionCamera } from '../../utils/PermissionCamera'

// Import mutations
import { TRAVELTRACING } from '../../graphql/mutations/Mutations'

// Import components
import Loader from '../../components/loader/Loader'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'
import Background from '../../components/background/Background'

// Import theme
import { Theme } from '../../constants/Theme'

const ScannerScreen = props => {
  const { navigate } = props.navigation
  const { userId } = useSelector(state => state.user)
  const [manualQR, setManualQR] = useState(false)
  const [loader, setLoader] = useState(false)
  const [codeQR, setCodeQR] = useState('')
  const [TravelTracing, { loading }] = useMutation(TRAVELTRACING)
  useEffect(() => {
    const verifyPermission = async () => {
      await permissionCamera()
    }
    verifyPermission()
  }, [])

  const handleOnReadyCode = async event => {
    Vibration.vibrate(1000)
    const scannerQR = event.nativeEvent.codeStringValue.split(' ')
    const idTravel = parseInt(scannerQR[0])
    const idUser = parseInt(scannerQR[1])

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

    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
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
              return navigate('TravelTrancing')
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
      }, error => {
        if (error) return <Error title='Error' description='Oh no, ocurrio un error al momento de obtener tu ubicacion, intente de nuevo o mas tarde.' />
      }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 20 }
    )
  }

  const handleOnSubmit = async () => {
    setLoader(true)
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

    Geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        console.log({
          input: {
            idtravel: idTravel,
            idtravelstatus: 'CONFIRMADO',
            lat: latitude,
            lng: longitude
          }
        })
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
            if (error) {
              console.log(error)
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
      }, error => {
        if (error) return <Error title='Error' description='Oh no, ocurrio un error al momento de obtener tu ubicacion, intente de nuevo o mas tarde.' />
      }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 20 }
    )

    setLoader(false)
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
    <View style={{ flex: 1, backgroundColor: Theme.COLORS.colorMainAlt }}>
      <TouchableOpacity style={styles.buttonToggle} onPress={() => setManualQR(!manualQR)}>
        <Text allowFontScaling={false} style={styles.text}>{manualQR ? 'ESCANEAR QR' : 'AGREGAR MANUAL'}</Text>
      </TouchableOpacity>

      {
        !manualQR &&
        <CameraKitCameraScreen
          style={{ flex: 1 }}
          showFrame
          scanBarcode
          frameColor={Theme.COLORS.colorSecondary}
          laserColor={Theme.COLORS.colorMainDark}
          colorForScannerFrame='black'
          onReadCode={handleOnReadyCode}
        />

      }

      {
        manualQR &&
        <Background>
          <View style={styles.manualContainer}>

            <InputControl
              value={codeQR}
              setValue={setCodeQR}
              placeholder='Ingresa el codigo'
              placeholderTextColor={Theme.COLORS.colorParagraph}
              onChangeText={value => setCodeQR(value)}
              keyboardType='numeric'
              isActiveButton
              stylesInput={styles.stylesInput} />

            <IconButton
              disabled={loader}
              isActiveIcon
              message='CONFIRMAR'
              onPress={handleOnSubmit} />
          </View>
        </Background>

      }
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.normal
  },
  stylesInput: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 55,
    paddingRight: 50,
    paddingVertical: 12,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph,
    marginBottom: 20
  },
  buttonToggle: {
    width: '100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  manualContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  textManual: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  }
})

export default ScannerScreen
