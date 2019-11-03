import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Button
} from 'react-native'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import querys
import { GETDRIVERNEARBY } from '../../graphql/querys/Querys'

// Import components
import Background from '../../components/background/Background'
import Loader from '../../components/loader/Loader'

const DetailsTransportScreen = props => {
  const { navigate } = props.navigation
  const [arrayDriver, setArrayDriver] = useState([])
  const { categoryId, category, steps } = useSelector(state => state.travel)
  const { silver, golden, vip, president } = useSelector(state => state.drivers)
  const { latitude, longitude } = useSelector(state => state.location)
  const { data, loading, fetchMore } = useQuery(GETDRIVERNEARBY)

  if (loading) return <Loader />

  const handleOnSubmit = () => {
    switch (categoryId) {
      case 1:
        setArrayDriver(silver)
        break
      case 2:
        setArrayDriver(golden)
        break
      case 3:
        setArrayDriver(vip)
        break
      case 4:
        setArrayDriver(president)
        break
    }
    fetchMore({
      variables: { lat: latitude, lng: longitude, inputdrive: arrayDriver },
      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
        if (!fetchMoreResult) return prev
        return console.log(fetchMoreResult)
      }
    })
  }

  if (data) {
    console.log(data)
  }

  return (
    <Background>
      <View style={styles.screen}>

        {/* <Button
          title='Escanear QR'
          onPress={() => navigate('Scanner')}
        /> */}
        <Button
          title='SOLICITAR DRIVE'
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
