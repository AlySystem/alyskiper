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
      const arraySilver = silverChannel.filter(item => item.state !== undefined)

      const goldenChannel = response.channels.SkiperDrive_2.occupants
      const arrayGolden = goldenChannel.filter(item => item.state !== undefined)

      const vipChannel = response.channels.SkiperDrive_3.occupants
      const arrayVip = vipChannel.filter(item => item.state !== undefined)

      const presidentChannel = response.channels.SkiperDrive_4.occupants
      const arrayPresident = presidentChannel.filter(item => item.state !== undefined)

      setDrivers({
        silver: arraySilver,
        golden: arrayGolden,
        vip: arrayVip,
        president: arrayPresident
      })
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
