import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
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


const RequestScreen = props => {
  const MaxDistance = 25000
  const dispatch = useDispatch()
  const { navigate } = props.navigation
  const { userId } = useSelector(state => state.user)
  const { travel } = useSelector(state => state.travel)
  const { steps } = useSelector(state => state.direction)
  const { latitude, longitude } = useSelector(state => state.location)
  const [idTravel, setIdTravel] = useState(0)
  const { data } = useSubscription(GETNOTIFICATIONTRAVEL, { variables: { idusuario: userId } })
  const [RegisterTravel] = useMutation(TRAVELTRACING)

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
            showMessage({
              message: 'Oppsss',
              description: 'Tu solicitud fue rechazada, por favor intente de nuevo.',
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
            props.navigation.pop()
            break
          case 3:
            dispatch({
              type: ACTIVETRAVEL,
              payload: { travel: data.skiperTravel.id }
            })
            notification('AlySkiper', 'Tu solicitud de viaje fue aceptada con exito.')
            navigate('TravelTrancing', {
              idTravel: data.skiperTravel.id
            })
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

  useEffect(() => {
    const driverWithInRadius = []
    const { categoryId } = travel
    let categoryName = ''
    let orderDistance = []
    let accept = false
    let driverNearby = null
    const { duration, distance, end_address, start_address, start_location, end_location } = steps

    switch (categoryId) {

      // Driver.map(drive => {
      //  -- Si esta dentro del radio 
      //   if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, MaxDistance)) {
      //  -- Agregarlo al arreglo de id, conductores
      //     driverWithInRadius.push(drive.state.SkiperAgentId)
      //   }
      // })

      case 1:
        if (silver) {
          categoryName = 'SILVER'
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

    console.log(orderDistance)
    const execute = async () => {
      try {
        if (orderDistance.length > 0) {
          for (let i = 0; i < orderDistance.length; i++) {
            console.log(i, accept)
            const data = orderDistance[i]

            const variables = {
              iddriver: data['driveId'],
              lat_initial: data['latitude'],
              lng_initial: data['longitude'],
              time: duration.value,
              distance: parseInt(distance.value),
              idcurrency: 2,
            }

            await ValidateDrive({ variables }).then(
              ({ data: response }) => {
                if (response) {
                  if (response.ValidateDriveAvailable) {
                    accept = true
                    executeTravel(data['driveId'])
                    console.log(data['driveId'] + ' - ' + response.ValidateDriveAvailable)
                  }
                }
              }
            ).catch(() => { })

            if (accept) break;

            if (i === (orderDistance.length - 1)) {
              showMessage({
                message: 'Skiper',
                description: `No hay conductores disponibles en tu zona para la categoria, por favor selecciona otra de nuestras categorias.`,
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
          }

        }
        else {
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

      } catch (error) {
        console.log(error)
      }
    }

    execute()

    const executeTravel = (id) => {
      GenerateTravel({
        variables: {
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
            idcurrency: 2,
            idpayment_methods: 2,
            categoryId: categoryId
          },
          ip: ' '
        }
      })
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

          <Text style={{ color: Theme.COLORS.colorParagraph, fontFamily: 'Lato-Bold', fontSize: Theme.SIZES.normal }}>
            SOLICITANDO SKIPER...
          </Text>
          <View style={styles.containerButton}>
            <IconButton isActiveIcon onPress={handleOnCancel} message='CANCELAR SKIPER' />
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
