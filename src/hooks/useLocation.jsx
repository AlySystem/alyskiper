import { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'

export const useLocation = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState()
  const [errorRegion, setErrorRegion] = useState(false)

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true)
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({ latitude, longitude, latitudeDelta: 0.0143, longitudeDelta: 0.0134 })
          setIsLoading(false)
        }, error => {
          console.log(error)
          setErrorRegion(true)
        }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 0 }
      )
    }
    fetchLocation()
  }, [])

  return { errorRegion, isLoading, location }
}
