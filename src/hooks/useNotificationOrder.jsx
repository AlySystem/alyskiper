import { useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'

// Import subcriptions
import { GETNOTIFICATIONORDER } from '../graphql/subscription/Subcription'

import { notification } from './usePushNotification'

export const useNotificationOrder = (idCommerce, navigate) => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState()

  const { loading, error } = useSubscription(GETNOTIFICATIONORDER, {
    variables: { idcomercio: idCommerce },
    onSubscriptionData: ({ subscriptionData }) => {
      const { name, id } = subscriptionData.data.skiperOrders.skiperOrderTracing[0].orderStatus
      switch (id) {
        case 1:
          console.log(name)
          setStatus(1)
          break
        case 2:
          console.log(name)
          setStatus(2)
          notification('AlySkiper', 'Tu orden fue rechazada.')
          // navigate('')
          break
        case 3:
          setStatus(3)
          notification('AlySkiper', 'Tu orden fue aceptada con exito.')
          console.log(name)
          break
        case 4:
          setStatus(4)
          console.log(name)
          break
        case 5:
          setStatus(5)
          console.log(name)
          break
        case 6:
          setStatus(6)
          notification('AlySkiper', 'Tu orden esta en camino.')
          console.log(name)
          break
        case 7:
          setStatus(7)
          console.log(name)
          break
      }
    }
  })
  return { isLoading: loading, error, status }
}
