import { useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

// Import subcriptions
import { GETNOTIFICATIONORDER } from '../graphql/subscription/Subcription'

import { notification } from './usePushNotification'

export const useNotificationOrder = (idCommerce) => {
  const dispatch = useDispatch()
  const { userId, firstName } = useSelector(state => state.user)

  const { loading, error } = useSubscription(GETNOTIFICATIONORDER, {
    variables: { idcomercio: idCommerce },
    onSubscriptionData: ({ subscriptionData }) => {
      const { name } = subscriptionData.data.skiperOrders.skiperOrderTracing[0].orderStatus
      console.log(name)

      switch (name) {
        case 1:
          console.log(name)
          break
        case 2:
          console.log(name)
          break
        case 3:
          console.log(name)
          break
        case 4:
          console.log(name)
          break
        case 5:
          console.log(name)
          break
        case 6:
          console.log(name)
          break
        case 7:
          console.log(name)
          break
      }
    }
  })
  return { loading, error }
}
