import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

// Import custom hooks
import { useNotification } from '../../hooks/useNotification'

// Import querys
import { GETDRIVERNEARBY, GENERATETRAVEL } from '../../graphql/mutations/Mutations'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'
import DetailsTravel from '../../components/details/DetailsTravel'

const DetailsTransportScreen = props => {
  const { navigate } = props.navigation
  const { categoryId, category, steps } = useSelector(state => state.travel)
  const { userId } = useSelector(state => state.user)
  const { latitude, longitude } = useSelector(state => state.location)
  const { silver, golden, vip, president } = useSelector(state => state.drivers)
  const [isLoading, setIsLoading] = useState(false)
  const [GetDriverNearby, { data, error, loading }] = useMutation(GETDRIVERNEARBY)
  const [GenerateTravel] = useMutation(GENERATETRAVEL)
  useNotification(navigate)

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
    setIsLoading(true)
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
    setIsLoading(false)
  }

  useEffect(() => {
    const verifyData = () => {
      if (data) {
        const driverId = data.ObtenerDriveCercano
        const { duration, distance, end_address, start_address, start_location, end_location } = steps
        const distanceFinal = distance.text.split(' ')
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
            console.log('no tiene nada que ver', result)
          })
          .catch(error => {
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

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <DetailsTravel
            steps={steps}
            categoryId={categoryId}
            category={category}
          />
          <View
            style={{ marginBottom: 30, justifyContent: 'center', alignItems: 'center' }}
          >
            <IconButton
              message='SOLICITAR'
              isLoading={loading || isLoading}
              isActiveIcon
              onPress={handleOnSubmit}
            />
          </View>
        </ScrollView>
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
