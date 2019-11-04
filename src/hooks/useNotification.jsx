import { useState } from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import subcriptions
import { GETNOTIFICATIONTRAVEL } from '../graphql/subscription/Subcription'

export const useNotification = () => {
  const { userId } = useSelector(state => state.user)
  const [status, setStatus] = useState()
  const { loading, error } = useSubscription(GETNOTIFICATIONTRAVEL, {
    variables: { idusuario: userId },
    onSubscriptionData: ({ subscriptionData }) => {
      const { travelstatus: { id } } = subscriptionData.data.skiperTravel.skiperTravelsTracing[0]
      setStatus(id)
    }
  })
  return { status, loading, error }
}
