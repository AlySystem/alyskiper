import { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'

// import utils
import { hasLocationPermission } from '../utils/PermissionLocation'

export const useLocation = () => {
  const [region, setRegion] = useState()
  const [error, setError] = useState(null)
  let watchId = null

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await hasLocationPermission()
      if (!location) return

      watchId = Geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          setRegion({ latitude, longitude, latitudeDelta: 0.0143, longitudeDelta: 0.0134 })
        }, error => {
          setError(error)
        }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100 }
      )
    }
    fetchLocation()

    return () => {
      Geolocation.clearWatch(watchId)
    }
  }, [watchId, setRegion, setError])

  return { region, error }
}
