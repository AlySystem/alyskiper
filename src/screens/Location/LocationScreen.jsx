import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text
} from 'react-native'
import LottieView from 'lottie-react-native'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'

// Import action types
import { ACTIVETRAVEL } from '../../store/actionTypes'

// Import querys
import { GETTRAVELBYUSERID } from '../../graphql/querys/Querys'

// Import animations
import Location from '../../../world-locations.json'

// Import hooks
import { useVerifyLocation } from '../../hooks/useVerifyLocation'

// Import theme
import { Theme } from '../../constants/Theme.js'

const LocationScreen = props => {
  const dispatch = useDispatch()
  const { navigate } = props.navigation
  const [userId] = useState(props.navigation.getParam('userId'))
  const { loading, data } = useQuery(GETTRAVELBYUSERID, { variables: { iduser: userId } })
  const { isLoading } = useVerifyLocation(navigate)

  const verifyState = (isLoading) => {
    if (!isLoading) return navigate('Home')
  }

  const verifyTravel = (loading) => {
    if (!loading) {
      if (data !== null && data !== undefined) {
        dispatch({
          type: ACTIVETRAVEL,
          payload: data
        })
      }
    }
  }

  useEffect(() => {
    verifyState(isLoading)
  }, [verifyState, isLoading])

  useEffect(() => {
    verifyTravel(loading)
  }, [loading])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <LottieView
          style={{
            width: 300,
            height: 300
          }}
          source={Location}
          autoPlay
          autoSize
          resizeMode='contain'
          loop
        />
        <Text allowFontScaling={false} style={styles.title}>OBTENIENDO UBICACION...</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  },
  image: {
    resizeMode: 'contain',
    width: 130,
    height: 40
  }
})

export default LocationScreen
