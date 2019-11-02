import { useState, useEffect } from 'react'
import PubNubReact from 'pubnub-react'

// Import utils
import { keys } from '../utils/keys'

export const usePubnub = () => {
  const [drivers, setDrivers] = useState()
  const pubnub = new PubNubReact({
    publishKey: 'pub-c-b5350d6e-9a1f-4d33-b5c9-918fe9bff121',
    subscribeKey: 'sub-c-e286360e-fdc3-11e9-be22-ea7c5aada356',
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122
  })

  useEffect(() => {
    pubnub.subscribe({
      channels: [`${keys.channels.drivers.silver}`, `${keys.channels.drivers.golden}`, `${keys.channels.drivers.vip}`, `${keys.channels.drivers.president}`],
      withPresence: true
    })

    pubnub.hereNow({
      includeUUIDs: true,
      includeState: true,
      channels: [`${keys.channels.drivers.silver}`, `${keys.channels.drivers.golden}`, `${keys.channels.drivers.vip}`, `${keys.channels.drivers.president}`]
    },

    function (status, response) {
      const silverChannel = response.channels.SkiperDrive_1.occupants
      const silver = silverChannel.filter(item => item.state !== undefined)

      const goldenChannel = response.channels.SkiperDrive_2.occupants
      const golden = goldenChannel.filter(item => item.state !== undefined)

      const vipChannel = response.channels.SkiperDrive_3.occupants
      const vip = vipChannel.filter(item => item.state !== undefined)

      const presidentChannel = response.channels.SkiperDrive_4.occupants
      const president = presidentChannel.filter(item => item.state !== undefined)

      setDrivers([
        silver,
        golden,
        vip,
        president
      ])
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
  }, [])

  return { drivers }
}
