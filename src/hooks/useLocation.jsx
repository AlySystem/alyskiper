import { useState, useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service'
import { useDispatch } from 'react-redux'

// Import actions types
import { LOCATIONDETAILS } from '../store/actionTypes'

// Import screen
import Error from '../screens/Error/Error'

export const useLocation = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true)
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          console.log(latitude, longitude)
          dispatch({
            type: LOCATIONDETAILS,
            payload: {
              location: {
                latitude,
                longitude,
                longitudeDelta: 0.0134,
                latitudeDelta: 0.0143
              }
            }
          })
          setIsLoading(false)
        }, error => {
          if (error) return <Error title='Error' message='Oh no, ocurrio un error al momento de obtener tu ubicacion, intente de nuevo o mas tarde.' />
          setError(true)
        }, { timeout: 2000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 0 }
      )
    }
    fetchLocation()
  }, [])

  return { error, isLoaded: isLoading }
}
