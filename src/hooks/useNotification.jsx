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

export const useNotification = (navigate, latitude, longitude) => {
  const dispatch = useDispatch()
  const { userId, firstName } = useSelector(state => state.user)
  const [status, setStatus] = useState()
  const [idTravel, setIdTravel] = useState()

  const pubnub = new PubNubReact({
    publishKey: 'pub-c-b5350d6e-9a1f-4d33-b5c9-918fe9bff121',
    subscribeKey: 'sub-c-e286360e-fdc3-11e9-be22-ea7c5aada356',
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122,
    uuid: firstName
  })

  const { loading, error } = useSubscription(GETNOTIFICATIONTRAVEL, {
    variables: { idusuario: userId },
    onSubscriptionData: ({ subscriptionData }) => {
      const { travelstatus: { id } } = subscriptionData.data.skiperTravel.skiperTravelsTracing[0]
      setStatus(id)
      setIdTravel(subscriptionData.data.skiperTravel.id)
      console.log(id, 'STATUS TRAVEL')

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
          navigate('Transport')
          break
        case 3:
          dispatch({
            type: ACTIVETRAVEL,
            payload: { travel: idTravel }
          })
          notification('AlySkiper', 'Tu solicitud de viaje fue aceptada con exito.')
          navigate('TravelTrancing', {
            idTravel: idTravel
          })
          break
        case 4:
          notification('AlySkiper', 'El conductor ya se encuentra cerca de ti.')
          navigate('Scanner', { latitude: latitude, longitude: longitude })
          break
        case 8:
          notification('AlySkiper', 'Felicidades, has llegado a tu destino.')
          pubnub.unsubscribe({
            channels: [`Driver_${idTravel || subscriptionData.data.skiperTravel.id}`]
          })
          navigate('FinalTravel')
          break
      }
    }
  })
  return { status, idTravel, loading, error }
}
