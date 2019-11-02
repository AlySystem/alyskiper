import { useState, useEffect } from 'react'
import PubNubReact from 'pubnub-react'

// Import utils
import { keys } from '../utils/keys'

export const usePubnub = () => {
  const [drivers, setDrivers] = useState()
  const pubnub = new PubNubReact({
    publishKey: 'pub-c-1271b42f-b90f-402d-99a8-749d0d2a13a7',
    subscribeKey: 'sub-c-36cd6120-e9e6-11e9-bee7-82748ed6f7e5',
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122
  })

  useEffect(() => {
    pubnub.subscribe({
      channels: [`${keys.channels.drivers}`],
      withPresence: true
    })

    pubnub.hereNow({
      includeUUIDs: true,
      includeState: true,
      channels: [`${keys.channels.drivers}`]
    },

    function (status, response) {
      const { occupants } = response.channels.Conductor
      const newArray = occupants.filter(item => item.state !== undefined)
      setDrivers(newArray)
    })

    //   pubnub.addListener({
    //     status: function (statusEvent) {

    //     },
    //     message: function (message) {

    //     },
    //     presence: function (presenceEvent) {

    //     }
    //   })
    // }

    return () => {
      pubnub.unsubscribe({
        channels: [`${keys.channels.drivers}`]
      })
    }
  }, [pubnub])

  return { drivers }
}
