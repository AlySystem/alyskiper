import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'
import { isPointWithinRadius, orderByDistance } from 'geolib'

// Import querys
import { GENERATETRAVEL, TRAVELTRACING } from '../../graphql/mutations/Mutations'

// Import subscription
import { GETNOTIFICATIONTRAVEL } from '../../graphql/subscription/Subcription'

// Import actions
import { REMOVEDETAILSTRAVEL, REMOVELOCATION, ACTIVETRAVEL } from '../../store/actionTypes'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'
import Picture from '../../components/picture/Picture'
import Loader from '../../components/loader/Loader'

// Import theme
import { Theme } from '../../constants/Theme'

// Import utils
import { notification } from '../../hooks/usePushNotification'
import ValidateSkiperDrive from '../../graphql/mutations/ValidateSkiperDrive'

/**Variable que indica el ultimo conductor disponible que se solicito viaje */
// let lastIndex = 0

// let lengthAllDrivers = 0

const RequestScreen = props => {
  const MaxDistance = 25000
  const dispatch = useDispatch()
  const { navigate } = props.navigation
  const { userId } = useSelector(state => state.user)
  const { travel, priceTravel } = useSelector(state => state.travel)
  const { steps } = useSelector(state => state.direction)
  const { latitude, longitude } = useSelector(state => state.location)
  const [idTravel, setIdTravel] = useState(0)
  const [message, setMessage] = useState('Buscando Skiper...')
  const [disabled, setDisabled] = useState(false)
  const { data } = useSubscription(GETNOTIFICATIONTRAVEL, { variables: { idusuario: userId } })
  const [RegisterTravel] = useMutation(TRAVELTRACING)

  const [lastIndex, setLastIndex] = useState(0)
  const [lengthAllDrivers, setLengthAllDrivers] = useState(0)

  // Mutation que valida si el drive esta disponible
  const [ValidateDrive] = useMutation(ValidateSkiperDrive, {
    onError: ({ message }) => {
      console.log(message)
    }
  })

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
  const [GenerateTravel, { error }] = useMutation(GENERATETRAVEL)

  const handleOnCancel = async () => {
    setDisabled(true)
    await RegisterTravel({
      variables: {
        input: {
          idtravel: idTravel,
          idtravelstatus: 'CANCELADO',
          lat: latitude,
          lng: longitude,
        }
      }
    }).then(
      () => {
        dispatch({
          type: REMOVEDETAILSTRAVEL,
        })

        dispatch({
          type: REMOVELOCATION
        })

        props.navigation.pop()
      }
    ).catch(
      () => {
        showMessage({
          message: 'Skiper',
          description: 'Tu solicitud no puede ser cancelada.',
          backgroundColor: '#d35400',
          color: '#fff',
          duration: 5000,
          icon: 'info',
        })
      }
    )
    setDisabled(false)

  }

  useEffect(() => {
    if (props.navigation.isFocused()) {
      if (data) {
        const { travelstatus: { id } } = data.skiperTravel.skiperTravelsTracing[0]
        dispatch({ type: 'ESTADOVIAJE', payload: { id } })


        switch (id) {
          case 1:
            setIdTravel(data.skiperTravel.id)
            break;
          case 2:
            setTimeout(() => {
              if ((lastIndex + 1) < lengthAllDrivers) {
                executeAllProcces(lastIndex + 1)
              } else {
                // Mostramos un mensaje de error
                showMessage({
                  message: `Skiper`,
                  description: `En este momento no hay Skipers disponibles, por favor selecciona otra de nuestras categorias.`,
                  backgroundColor: '#d35400',
                  color: '#fff',
                  icon: 'danger',
                  duration: 8000,
                  titleStyle: {
                    fontWeight: 'bold',
                  },
                  textStyle: {
                    paddingRight: 10
                  }
                })

                // Navegamos una ventana atras
                props.navigation.pop()
              }
            }, 2000)
            break
          case 3:
            dispatch({
              type: ACTIVETRAVEL,
              payload: { travel: data.skiperTravel.id }
            })
            notification('AlySkiper', 'Tu solicitud de viaje fue aceptada con exito.')
            AsyncStorage.setItem('travel', 'true')
            navigate('TravelTrancing', { idTravel: data.skiperTravel.id })
            break
        }
      }
    }
  }, [data])

  useEffect(() => {
    if (error) {
      showMessage({
        message: 'Skiper',
        description: 'No hay conductores en tu zona, por favor selecciona otra de nuestras categorias.',
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
  }, [error])

  /**Proceso que hace busqueda */
  const executeAllProcces = (index) => {
    const driverWithInRadius = []
    const { categoryId } = travel
    let categoryName = ''
    let categoryColor = ''
    let orderDistance = []
    let driverNearby = null
    let accept = false
    const { duration, distance, end_address, start_address, start_location, end_location } = steps

    switch (categoryId) {
      case 1:
        if (silver) {
          categoryName = 'SILVER'
          categoryColor = '#7f8c8d'
          silver.map(drive => {
            if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, MaxDistance)) {
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
          categoryColor = '#f1c40f'
          golden.map(drive => {
            if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, MaxDistance)) {
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
          categoryColor = '#8e44ad'
          vip.map(drive => {
            if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, MaxDistance)) {
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
          categoryColor = '#2980b9'
          president.map(drive => {
            if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, MaxDistance)) {
              driverWithInRadius.push({ driveId: drive.state.SkiperAgentId, latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude })
            }
          })
          orderDistance = orderByDistance({ latitude, longitude }, driverWithInRadius)
          driverNearby = orderDistance[0]
        }

        break
    }

    const execute = async () => {
      try {
        // Verificamos si hay conductores cerca con la categoria seleccionada
        if (orderDistance.length > 0) {

          setLengthAllDrivers(orderDistance.length)

          // Recorremos todos los conductores
          for (let i = index ? index : 0; i < orderDistance.length; i++) {
            // Si no hay conductores dispoibles

            // seteamos el texto que se mostrara al usuario 
            setMessage(`Solicitando Skipers ${i + 1} de ${orderDistance.length}`)

            // Los datos del conductor
            const data = orderDistance[i]

            // Todos los datos que ejecutamos para validar el conductor
            const variables = {
              iddriver: data['driveId'],
              lat_initial: data['latitude'],
              lng_initial: data['longitude'],
              time: duration.value,
              distance: parseInt(distance.value),
              idcurrency: priceTravel.currencyID,
              idcategoryTravel: travel.categoryId
            }

            // Validamos si el conductor esta dispobible y si tiene wallet 
            await ValidateDrive({ variables }).then(async ({ data: response }) => {
              // Validamos si hay respuesta
              if (response) {

                // Validamos si hay respuesta y si esta disponible
                if (response.ValidateDriveAvailable) {
                  setMessage(`Esperando respuesta de Skiper`)

                  // Con esta variable rompemos el bucle para solicitar el viaje
                  accept = true

                  // Seteamos el ultimo consuctor
                  setLastIndex(i)

                  // Ejecutamos la solicitud del viaje
                  await executeTravel(data['driveId'])
                }
              }
            }).catch(() => { })

            // Si encontro un driver disponible, rompemos el bucle
            if (accept) break;

          }
        } else {
          // Mostramos un mensaje de error
          showMessage({
            message: `Skiper ${categoryName}`,
            description: `No hay Skipers ${categoryName} cerca, por favor selecciona otra de nuestras categorias.`,
            backgroundColor: categoryColor,
            color: categoryName === 'GOLDEN' ? '#3d3d3d' : '#fff',
            icon: 'danger',
            duration: 8000,
            titleStyle: {
              fontWeight: 'bold',
            },
            textStyle: {
              paddingRight: 10
            }
          })

          // Navegamos una ventana atras
          props.navigation.pop()
        }

      } catch (error) {
        console.log(error)
      }
    }

    execute()

    const executeTravel = (id) => {
      const variables = {
        inputviaje: {
          idusers: userId,
          iddriver: id,
          lat_initial: start_location.lat,
          lng_initial: start_location.lng,
          lat_final: end_location.lat,
          lng_final: end_location.lng,
          distance: parseInt(distance.value),
          time: duration.value,
          address_initial: start_address,
          address_final: end_address,
          idcurrency: priceTravel.currencyID,
          idpayment_methods: 2,
          categoryId: categoryId
        },
        ip: ' '
      }

      GenerateTravel({ variables }).then((data) => console.log(data)).catch((reason) => console.log(reason))

      // return new Promise((resolve, reject) => {

      // })
    }
  }

  useEffect(() => {
    executeAllProcces()

  }, [])

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <Picture source={require('../../../assets/images/img-alyskiper-masked.png')} />

          <View style={{ marginVertical: 5 }} />

          <Loader />

          <View style={{ marginVertical: 10 }} />

          <Text style={{ color: Theme.COLORS.colorParagraph, fontFamily: 'Lato-Bold', fontSize: Theme.SIZES.normal }}>
            {message}
          </Text>
          <View style={styles.containerButton}>
            <IconButton isActiveIcon onPress={handleOnCancel} disabled={disabled} message='CANCELAR SKIPER' />
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
