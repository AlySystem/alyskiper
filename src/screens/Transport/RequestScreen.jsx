import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'

// Import querys
import { GETDRIVERNEARBY, GENERATETRAVEL } from '../../graphql/mutations/Mutations'

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
  const { goBack, navigate } = props.navigation
  const { userId } = useSelector(state => state.user)
  const { travel } = useSelector(state => state.travel)
  const { steps } = useSelector(state => state.direction)
  const { latitude, longitude } = useSelector(state => state.location)
  const { silver, golden, vip, president } = useSelector(state => state.drivers)
  const [GetDriverNearby, { error }] = useMutation(GETDRIVERNEARBY)
  const [GenerateTravel] = useMutation(GENERATETRAVEL)
  useNotification(navigate, latitude, longitude)

  const handleOnCancel = () => {
    dispatch({
      type: REMOVEDETAILSTRAVEL
    })
    dispatch({
      type: REMOVELOCATION
    })
    // goBack()
    props.navigation.pop()
  }

  useEffect(() => {
    const finalArray = []
    const { categoryId } = travel
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

    GetDriverNearby({
      variables: {
        lat: latitude, lng: longitude, inputdrive: finalArray
      }
    })
      .then(({ data }) => {
        const driverId = data.ObtenerDriveCercano
        const { categoryId } = travel
        const { duration, distance, end_address, start_address, start_location, end_location } = steps

        GenerateTravel({
          variables: {
            inputviaje: {
              idusers: userId,
              iddriver: driverId,
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
            }
          }
        })
          .catch(error => {
            showMessage({
              message: 'Error',
              description: `${error}`,
              backgroundColor: 'red',
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
            goBack()
          })
      })
  }, [])

  useEffect(() => {
    const verifyError = () => {
      if (error) {
        showMessage({
          message: 'Error',
          description: `${error.graphQLErrors[0].message} en tu zona para esta categoria, por favor seleccione otra categoria.`,
          backgroundColor: 'red',
          color: '#fff',
          icon: 'danger',
          duration: 12000,
          titleStyle: {
            fontFamily: 'Lato-Bold'
          },
          textStyle: {
            fontFamily: 'Lato-Regular'
          }
        })
        goBack()
      }
    }
    verifyError()
  }, [error])

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
