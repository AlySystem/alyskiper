import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'
import PublicIp from 'react-native-public-ip'
import { isPointWithinRadius, orderByDistance } from 'geolib'

// Import querys
import { GENERATETRAVEL } from '../../graphql/mutations/Mutations'

// Import actions
import { REMOVEDETAILSTRAVEL, REMOVELOCATION } from '../../store/actionTypes'

// Import hooks
import { useNotification } from '../../hooks/useNotification'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'
import Picture from '../../components/picture/Picture'
import Loader from '../../components/loader/Loader'

// Import theme
import { Theme } from '../../constants/Theme'

const RequestScreen = props => {
  const dispatch = useDispatch()
  const { navigate } = props.navigation
  const { userId } = useSelector(state => state.user)
  const { travel } = useSelector(state => state.travel)
  const { steps } = useSelector(state => state.direction)
  const { latitude, longitude } = useSelector(state => state.location)

  const { silver, golden, vip, president } = useSelector(state => {
    // Verificamos si hay drivers
    // Si no hay drivers, retornamos todos los drivers en arreglos vacios
    // esto para que no reviente
    if (state.drivers.length === 0) {
      return {
        silver: [],
        golden: [],
        vip: [],
        president: []
      }
    } else {
      return state.drivers
    }
  })

  // const [GenerateTravel, { error }] = useMutation(GENERATETRAVEL, {
  //   onError: ({ message }) => {
  //     // Cuando encontramos un error al ejecutar la mutation
  //     // Mostramos el mensaje y vamos hacia atras
  //     console.log(message)
  //     showMessage({
  //       message: 'Mensaje de Skiper',
  //       description: 'No hay conductores cerca en tu zona, por favor selecciona otra de nuestras categorias.',
  //       backgroundColor: '#7f8c8d',
  //       color: '#fff',
  //       icon: 'danger',
  //       duration: 8000,
  //       titleStyle: {
  //         fontFamily: 'Lato-Bold'
  //       },
  //       textStyle: {
  //         fontFamily: 'Lato-Regular'
  //       }
  //     })

  //     props.navigation.pop()
  //   }
  // })
  const [GenerateTravel, { error }] = useMutation(GENERATETRAVEL)
  useNotification(navigate, latitude, longitude)

  const handleOnCancel = () => {
    dispatch({
      type: REMOVEDETAILSTRAVEL
    })
    dispatch({
      type: REMOVELOCATION
    })
    props.navigation.pop()
  }

  useEffect(() => {
    const driverWithInRadius = []
    const { categoryId } = travel
    let categoryName = ''
    let orderDistance = null
    let driverNearby = null
    const { duration, distance, end_address, start_address, start_location, end_location } = steps

    switch (categoryId) {
      case 1:
        if (silver) {
          categoryName = 'SILVER'
          silver.map(drive => {
            if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, 25000)) {
              driverWithInRadius.push({ driveId: drive.state.SkiperAgentId, latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude })
            }
          })
          orderDistance = orderByDistance({ latitude, longitude }, driverWithInRadius)
          driverNearby = orderDistance[0]
        }

        break
      case 2:
        if (golden) {
          categoryName = 'GOLDEN'
          golden.map(drive => {
            if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, 25000)) {
              driverWithInRadius.push({ driveId: drive.state.SkiperAgentId, latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude })
            }
          })
          orderDistance = orderByDistance({ latitude, longitude }, driverWithInRadius)
          driverNearby = orderDistance[0]
        }

        break
      case 3:
        if (vip) {
          categoryName = 'VIP'
          vip.map(drive => {
            if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, 25000)) {
              driverWithInRadius.push({ driveId: drive.state.SkiperAgentId, latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude })
            }
          })
          orderDistance = orderByDistance({ latitude, longitude }, driverWithInRadius)
          driverNearby = orderDistance[0]
        }

        break
      case 4:
        if (president) {
          categoryName = 'PRESIDENT'
          president.map(drive => {
            if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, 25000)) {
              driverWithInRadius.push({ driveId: drive.state.SkiperAgentId, latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude })
            }
          })
          orderDistance = orderByDistance({ latitude, longitude }, driverWithInRadius)
          driverNearby = orderDistance[0]
        }

        break
    }

    console.log(driverNearby)
    console.log(orderDistance)

    if (driverNearby !== null && driverNearby !== undefined) {
      // Si hay driver cerca, generamos el el viaje

      do {
        PublicIp().then(
          _ip => {
            GenerateTravel({
              variables: {
                inputviaje: {
                  idusers: userId,
                  iddriver: driverNearby['driveId'],
                  lat_initial: start_location.lat,
                  lng_initial: start_location.lng,
                  lat_final: end_location.lat,
                  lng_final: end_location.lng,
                  distance: parseInt(distance.value),
                  time: duration.value,
                  address_initial: start_address,
                  address_final: end_address,
                  idcurrency: 2,
                  idpayment_methods: 2,
                  categoryId: categoryId,
                  total: 80
                },
                ip: _ip
              }
            })
              .catch(error => )
          })

      } while (error !== null)
    } else {
      // Mostramos un mensaje de error 
      showMessage({
        message: 'Skiper',
        description: `No hay conductores cerca en tu zona para la categoria ${categoryName}, por favor selecciona otra de nuestras categorias.`,
        backgroundColor: '#7f8c8d',
        color: '#fff',
        icon: 'danger',
        duration: 8000,
        titleStyle: {
          fontFamily: 'Lato-Bold'
        },
        textStyle: {
          fontFamily: 'Lato-Regular'
        }
      })

      props.navigation.pop()
    }
  }, [])

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <Picture source={require('../../../assets/images/img-alyskiper-masked.png')} />
          <View style={{ marginVertical: 5 }} />
          <Loader />
          <View style={{ marginVertical: 10 }} />
          <Text style={{
            color: Theme.COLORS.colorParagraph,
            fontFamily: 'Lato-Bold',
            fontSize: Theme.SIZES.normal
          }}
          >SOLICITANDO SKIPER...
          </Text>
          <View style={styles.containerButton}>
            <IconButton
              isActiveIcon
              onPress={handleOnCancel}
              message='CANCELAR SKIPER'
            />
          </View>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  }
})

export default RequestScreen
