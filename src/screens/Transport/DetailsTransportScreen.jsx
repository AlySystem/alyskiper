import React from 'react'
import {
  View,
  StyleSheet,
  Button
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'

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
  const [GetDriverNearby, { data, loading }] = useMutation(GETDRIVERNEARBY)
  const [GenerateTravel] = useMutation(GENERATETRAVEL)

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

  if (data) {
    const driverId = data.ObtenerDriveCercano
    const { duration, distance, end_address, start_address } = steps
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
          distance: distanceFinal[0],
          time: duration.value,
          address_initial: start_address,
          address_final: end_address
        }
      }
    })
  }

  return (
    <Background>
      <View style={styles.screen}>

        {/* <Button
          title='Escanear QR'
          onPress={() => navigate('Scanner')}
        /> */}
        <IconButton
          message='SOLICITAR'
          isActiveIcon
          isLoading={loading}
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
