import { useEffect, useState } from 'react'
import RNLocation from 'react-native-location'

export const Location = () => {
  const [location, setLocation] = useState(null)

  RNLocation.configure({
    distanceFilter: 0
  })
  useEffect(() => {
    const unsubscribe = RNLocation.subscribeToLocationUpdates(location =>
      setLocation({
        latitude: location[0].latitude,
        longitude: location[0].longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134
      }))

    return () => {
      unsubscribe()
    }
  })

  return { location }
}
