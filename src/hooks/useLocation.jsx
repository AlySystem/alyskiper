import { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { useDispatch } from 'react-redux'

export const useLocation = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState()
  const [errorRegion, setErrorRegion] = useState(null)

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true)
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({ latitude, longitude, latitudeDelta: 0.0143, longitudeDelta: 0.0134 })
          setIsLoading(false)
        }, error => {
          setErrorRegion(error)
        }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 0 }
      )
    }
    fetchLocation()
  }, [dispatch])

  return { errorRegion, isLoading, location }
}
