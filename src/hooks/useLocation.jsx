import { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { useDispatch } from 'react-redux'

// import utils
import { hasLocationPermission } from '../utils/PermissionLocation'

// Import actions type
import { LOCATION } from '../store/actionTypes'

export const useLocation = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [errorRegion, setErrorRegion] = useState(null)
  let watchId = null

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await hasLocationPermission()
      if (!location) return
      setIsLoading(true)

      watchId = Geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          dispatch({
            type: LOCATION,
            payload: {
              latitude,
              longitude
            }
          })
          setIsLoading(false)
        }, error => {
          setErrorRegion(error)
        }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 0 }
      )
    }
    fetchLocation()

    return () => {
      Geolocation.clearWatch(watchId)
    }
  }, [watchId, dispatch])

  return { errorRegion, isLoading }
}
