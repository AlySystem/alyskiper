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
    publishKey: 'pub-c-2ed1b9dc-e811-411f-99f5-01a3addeda39',
    subscribeKey: 'sub-c-8a28b1d0-28d4-11ea-894a-b6462cb07a90',
    subscribeRequestTimeout: 60000,
    presenceTimeout: 122,
    uuid: firstName
  })

  const allChanels = [`${keys.channels.drivers.silver}`, `${keys.channels.drivers.golden}`, `${keys.channels.drivers.vip}`, `${keys.channels.drivers.president}`]

  useEffect(() => {
    pubnub.subscribe({
      channels: allChanels,
      withPresence: true
    })

    pubnub.hereNow({ includeUUIDs: true, includeState: true, channels: allChanels }, (status, response) => {

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
      }
    })

  }, [])

  return { silver: drivers.silver, golden: drivers.golden, vip: drivers.vip, president: drivers.president }
}
