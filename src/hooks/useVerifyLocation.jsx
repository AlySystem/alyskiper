// Import hooks
import { useLocation } from '../hooks/useLocation'

// Import screen
import Error from '../screens/Error/Error'

export const useVerifyLocation = () => {
  const { errorRegion, isLoading, location } = useLocation()
  if (errorRegion) return <Error title='Error' message='Oh no, ocurrio un error al momento de obtener tu ubicacion, intente de nuevo o mas tarde.' />

  return { isLoading, location }
}
