import { useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

// Import actions types
import { ACTIVETRAVEL } from '../store/actionTypes'

// Import subcriptions
import { GETNOTIFICATIONTRAVEL } from '../graphql/subscription/Subcription'

import { notification } from '../hooks/usePushNotification'

export const useNotification = (navigate) => {
  const dispatch = useDispatch()
  const { userId } = useSelector(state => state.user)
  const [status, setStatus] = useState()
  const [idTravel, setIdTravel] = useState()
  const { loading, error } = useSubscription(GETNOTIFICATIONTRAVEL, {
    variables: { idusuario: userId },
    onSubscriptionData: ({ subscriptionData }) => {
      const { travelstatus: { id } } = subscriptionData.data.skiperTravel.skiperTravelsTracing[0]
      setStatus(id)
      setIdTravel(subscriptionData.data.skiperTravel.id)

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
        case 8:
          notification('AlySkiper', 'Felicidades, has llegado a tu destino.')
          navigate('FinalTravel')
          break
      }
    }
  })
  return { status, idTravel, loading, error }
}
