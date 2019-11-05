import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

// Import custom hooks
import { useNotification } from '../../hooks/useNotification'
import { notification } from '../../hooks/usePushNotification'

// Import actions types
import { ACTIVETRAVEL } from '../../store/actionTypes'

// Import querys
import { GETDRIVERNEARBY, GENERATETRAVEL } from '../../graphql/mutations/Mutations'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'

const DetailsTransportScreen = props => {
  const { navigate } = props.navigation
  const dispatch = useDispatch()
  const { categoryId, category, steps } = useSelector(state => state.travel)
  const { userId } = useSelector(state => state.user)
  const { latitude, longitude } = useSelector(state => state.location)
  const { silver, golden, vip, president } = useSelector(state => state.drivers)
  const [GetDriverNearby, { data, loading, error }] = useMutation(GETDRIVERNEARBY)
  const [isLoading, setIsLoading] = useState(false)
  const [GenerateTravel] = useMutation(GENERATETRAVEL)
  const { status, idTravel } = useNotification()

  if (error) {
    showMessage({
      message: 'Error',
      description: `${error.graphQLErrors[0].message} en tu zona para esta categoria, por favor seleccione otra categorias.`,
      backgroundColor: 'red',
      color: '#fff',
      icon: 'danger',
      duration: 4000,
      titleStyle: {
        fontFamily: 'Lato-Bold'
      },
      textStyle: {
        fontFamily: 'Lato-Regular'
      }
    })
  }

  const handleOnSubmit = async () => {
    const finalArray = []
    switch (categoryId) {
      case 1:
        silver.map(drive => {
          return finalArray.push({
            iddrive: drive.state.SkiperAgentId,
            lat: drive.state.coords.latitude,
            lng: drive.state.coords.longitude
          })
        })
        break
      case 2:
        golden.map(drive => {
          return finalArray.push({
            iddrive: drive.state.SkiperAgentId,
            lat: drive.state.coords.latitude,
            lng: drive.state.coords.longitude
          })
        })
        break
      case 3:
        vip.map(drive => {
          return finalArray.push({
            iddrive: drive.state.SkiperAgentId,
            lat: drive.state.coords.latitude,
            lng: drive.state.coords.longitude
          })
        })
        break
      case 4:
        president.map(drive => {
          return finalArray.push({
            iddrive: drive.state.SkiperAgentId,
            lat: drive.state.coords.latitude,
            lng: drive.state.coords.longitude
          })
        })
        break
    }

    GetDriverNearby({ variables: { lat: latitude, lng: longitude, inputdrive: finalArray } })
  }

  useEffect(() => {
    const verifyData = () => {
      if (data) {
        const driverId = data.ObtenerDriveCercano
        const { duration, distance, end_address, start_address, start_location, end_location } = steps
        const distanceFinal = distance.text.split(' ')
        setIsLoading(true)
        GenerateTravel({
          variables: {
            inputviaje: {
              idusers: userId,
              iddriver: driverId,
              lat_initial: start_location.lat,
              lng_initial: start_location.lng,
              lat_final: end_location.lat,
              lng_final: end_location.lng,
              distance: parseInt(distanceFinal[0]),
              time: duration.value,
              address_initial: start_address,
              address_final: end_address
            }
          }
        })
          .then(result => {
            if (result) {
              setIsLoading(false)
              navigate('Scanner')
            }
          })
          .catch(error => {
            setIsLoading(false)
            showMessage({
              message: 'Error',
              description: `${error.graphQLErrors[0].message}`,
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
          })
      }
    }
    verifyData()
  }, [data])

  useEffect(() => {
    const verifyStatus = () => {
      switch (status) {
        case 2:
          showMessage({
            message: 'Error',
            description: 'Su solicitud fue rechazada, por favor intente de nuevo.',
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
          break
        case 3:
          notification('Transporte', 'Tu solicitud de viaje fue aceptada con exito.')
          navigate('TravelTrancing', {
            idTravel: idTravel
          })
          dispatch({
            type: ACTIVETRAVEL,
            payload: idTravel
          })
          break
        case 4:
          notification('AlySkiper', 'El conductor ya se encuentra cerca de ti.')
          navigate('Scanner')
          break
      }
    }
    verifyStatus()
  }, [status])

  return (
    <Background>
      <View style={styles.screen}>
        <IconButton
          message='SOLICITAR'
          isActiveIcon
          isLoading={loading || isLoading}
          onPress={handleOnSubmit}
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  }
})

export default DetailsTransportScreen
