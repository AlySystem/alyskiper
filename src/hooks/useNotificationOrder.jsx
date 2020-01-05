import { useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'

// Import actions types
import { STATUSORDER, REMOVESTATUSORDER } from '../store/actionTypes'

// Import subcriptions
import { GETNOTIFICATIONORDER } from '../graphql/subscription/Subcription'

import { notification } from './usePushNotification'
import { AsyncStorage } from 'react-native'

export const useNotificationOrder = (idCommerce, navigate) => {
  const dispatch = useDispatch()
  const date = new Date()
  const [status, setStatus] = useState()

  const { loading, error } = useSubscription(GETNOTIFICATIONORDER, {
    variables: { idcomercio: idCommerce },
    onSubscriptionData: ({ subscriptionData }) => {
      const { name, id } = subscriptionData.data.skiperOrders.skiperOrderTracing[0].orderStatus
      switch (id) {
        case 1:
          
          dispatch({
            type: STATUSORDER,
            payload: {
              message: 'SOLICITADO',
              code: 1,
              date: `${date.getHours()}:${date.getMinutes()}`
            }
          })
          break
        case 2:
          
          dispatch({
            type: STATUSORDER,
            payload: {
              message: 'RECHAZADO',
              code: 2,
              date: `${date.getHours()}:${date.getMinutes()}`
            }
          })
          notification('AlySkiper', 'Tu orden fue rechazada.')
          navigate('Commerce')
          break
        case 3:
          dispatch({
            type: STATUSORDER,
            payload: {
              message: 'ACEPTADO',
              code: 3,
              date: `${date.getHours()}:${date.getMinutes()}`
            }
          })
          notification('AlySkiper', 'Tu orden fue aceptada con exito.')
          AsyncStorage.setItem('travel', 'true')
          break
        case 4:
          dispatch({
            type: STATUSORDER,
            payload: {
              message: 'ENPROCESO',
              code: 4,
              date: `${date.getHours()}:${date.getMinutes()}`
            }
          })
          break
        case 5:
          dispatch({
            type: STATUSORDER,
            payload: {
              message: 'FINALIZADO',
              code: 5,
              date: `${date.getHours()}:${date.getMinutes()}`
            }
          })
          AsyncStorage.removeItem('travel')
          break
        case 6:
          dispatch({
            type: STATUSORDER,
            payload: {
              message: 'ENCAMINO',
              code: 6,
              date: `${date.getHours()}:${date.getMinutes()}`
            }
          })
          notification('AlySkiper', 'Tu orden esta en camino.')          
          break
        case 7:
          dispatch({
            type: STATUSORDER,
            payload: {
              message: 'ENTREGADO',
              code: 7,
              date: `${date.getHours()}:${date.getMinutes()}`
            }
          })          
          break
      }
    }
  })
  return { isLoading: loading, error, status }
}
