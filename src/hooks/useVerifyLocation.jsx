import { useEffect } from 'react'

// Import custom hooks
import { useLocation } from '../hooks/useLocation'

export const useVerifyLocation = (navigate) => {
  const { errorRegion, isLoading } = useLocation()

  useEffect(() => {
    const verifyLocation = () => {
      if (errorRegion) {
        return navigate('Error', {
          title: 'Error de ubicacion',
          message: 'No hemos podido obtener tu ubicacion, asegurate de tener activado el GPS para ofrecerte una mejor experiencia.',
          routeName: 'Home'
        })
      }
      if (isLoading) return navigate('Location')
    }
    verifyLocation()
  }, [errorRegion, isLoading])
  return { isLoading }
}
