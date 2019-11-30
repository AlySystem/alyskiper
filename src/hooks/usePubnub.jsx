import { useState, useEffect } from 'react'
import PubNubReact from 'pubnub-react'
import { useSelector, useDispatch } from 'react-redux'

// Import action types
import { DRIVERS } from '../store/actionTypes'

// Import utils
import { keys } from '../utils/keys'

export const usePubnub = () => {
  const dispatch = useDispatch()
  const { firstName } = useSelector(state => state.user)
  const [drivers, setDrivers] = useState({})
  const pubnub = new PubNubReact({
    publishKey: 'pub-c-bd68b062-738a-44e5-91a1-cfdab437d40f',
    subscribeKey: 'sub-c-41661912-108b-11ea-9132-cacb72695e2d',
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122,
    uuid: firstName
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
      let silver, golden, vip, president

      if (response !== undefined) {
        if ('SkiperDrive_1' in response.channels) {
          const silverChannel = response.channels.SkiperDrive_1
          if (silverChannel !== undefined) {
            silver = silverChannel.occupants.filter(item => item.state !== undefined)
          }
        }

        if ('SkiperDrive_2' in response.channels) {
          const goldenChannel = response.channels.SkiperDrive_2
          if (goldenChannel !== undefined) {
            golden = goldenChannel.occupants.filter(item => item.state !== undefined)
          }
        }

        if ('SkiperDrive_3' in response.channels) {
          const vipChannel = response.channels.SkiperDrive_3
          if (vipChannel !== undefined) {
            vip = vipChannel.occupants.filter(item => item.state !== undefined)
          }
        }

        if ('SkiperDrive_4' in response.channels) {
          const presidentChannel = response.channels.SkiperDrive_4
          if (presidentChannel !== undefined) {
            president = presidentChannel.occupants.filter(item => item.state !== undefined)
          }
        }

        setDrivers({ silver, golden, vip, president })
        dispatch({
          type: DRIVERS,
          payload: {
            silver,
            golden,
            vip,
            president
          }
        })
        // console.log('SILVER', silver)
        // console.log('GOLDEN', golden)
        // console.log('VIP', vip)
        // console.log('PRESIDENT', president)
      }
    })

    pubnub.addListener({
      status: function (statusEvent) {

      },
      message: function (message) {

      },
      presence: function (presenceEvent) {
        // console.log(presenceEvent)
      }
    })

    // return () => {
    //   pubnub.unsubscribe({
    //     channels: [`${keys.channels.drivers.silver}`, `${keys.channels.drivers.golden}`, `${keys.channels.drivers.vip}`, `${keys.channels.drivers.president}`]
    //   })
    // }
  }, [drivers])

  return { silver: drivers.silver, golden: drivers.golden, vip: drivers.vip, president: drivers.president }
}
