import { useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import PubNubReact from 'pubnub-react'

// Import actions types
import { ACTIVETRAVEL } from '../store/actionTypes'

// Import subcriptions
import { GETNOTIFICATIONTRAVEL } from '../graphql/subscription/Subcription'

import { notification } from '../hooks/usePushNotification'

export const useNotification = (navigate, latitude, longitude, navigation) => {
  const dispatch = useDispatch()
  const { userId, firstName } = useSelector(state => state.user)
  const [idTravel, setIdTravel] = useState()

  const pubnub = new PubNubReact({
    publishKey: 'pub-c-bd68b062-738a-44e5-91a1-cfdab437d40f',
    subscribeKey: 'sub-c-41661912-108b-11ea-9132-cacb72695e2d',
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122,
    uuid: firstName
  })

  const { loading, error } = useSubscription(GETNOTIFICATIONTRAVEL, {
    variables: { idusuario: userId },
    onSubscriptionData: ({ subscriptionData }) => {
      const { travelstatus: { id } } = subscriptionData.data.skiperTravel.skiperTravelsTracing[0]
      setIdTravel(subscriptionData.data.skiperTravel.id)
      dispatch({ type: 'ESTADOVIAJE', payload: { id } })

      switch (id) {
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
          return navigate('Transport')
        case 3:
          dispatch({
            type: ACTIVETRAVEL,
            payload: { travel: idTravel }
          })
          notification('AlySkiper', 'Tu solicitud de viaje fue aceptada con exito.')
          return navigate('TravelTrancing', {
            idTravel: idTravel
          })
        case 4:
          notification('AlySkiper', 'El conductor ya se encuentra cerca de ti.')
          navigate('Scanner', { latitude: latitude, longitude: longitude })
          break
        case 8:
          notification('AlySkiper', 'Felicidades, has llegado a tu destino.')
          pubnub.unsubscribe({
            channels: [`Driver_${idTravel || subscriptionData.data.skiperTravel.id}`]
          })
          return navigate('FinalTravel')
        case 9:
          notification('AlySkiper', 'Su viaje ha sido cancelado.')
          pubnub.unsubscribe({
            channels: [`Driver_${idTravel || subscriptionData.data.skiperTravel.id}`]
          })
          return navigate('Home')
        case 10:
          notification('AlySkiper', 'Su viaje ha sido finalizado.')
          pubnub.unsubscribe({
            channels: [`Driver_${idTravel || subscriptionData.data.skiperTravel.id}`]
          })
          return navigate('FinalTravel')
      }
    }
  })

  return { idTravel, loading, error }
}
