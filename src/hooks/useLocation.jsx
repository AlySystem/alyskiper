import React, { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'

// Import screen
import Error from '../screens/TemplateError/TemplateError'

export const useLocation = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
    loading: false
  })

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true)
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
            loading: true
          })
          setLoading(false)
        }, error => {
          if (error) return <Error title='Error' description='Oh no, ocurrio un error al momento de obtener tu ubicacion, intente de nuevo o mas tarde.' />
          setError(true)
        }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 20 }
      )
    }
    fetchLocation()
  }, [])

  return { error, loading, location }
}
