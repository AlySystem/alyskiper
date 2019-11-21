import React, { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'

// Import screen
import Error from '../screens/TemplateError/TemplateError'

export const useWatchLocation = () => {
  let watchId
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134
  })

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true)
      watchId = Geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          })
          setLoading(false)
        }, error => {
          if (error) return <Error title='Error' description='Oh no, ocurrio un error al momento de obtener tu ubicacion, intente de nuevo o mas tarde.' />
          setError(true)
        }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 0 }
      )
    }
    fetchLocation()

    return () => {
      Geolocation.clearWatch(watchId)
    }
  }, [watchId])

  return { error, loading, location }
}
