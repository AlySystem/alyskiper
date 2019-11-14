import { useEffect, useState } from 'react'
import GPSState from 'react-native-gps-state'

export const useStatusGps = () => {
  const [message, setMessage] = useState('')
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    GPSState.addListener(status => {
      switch (status) {
        case GPSState.NOT_DETERMINED:
          setMessage('Hola, permita que la aplicacion pueda acceder a su ubicacion para que podemos hacer cosas increibles.')
          setDenied(true)
          break
        case GPSState.RESTRICTED:
          setDenied(true)
          setMessage('Hola, permita que la aplicacion pueda acceder a su ubicacion para que podemos hacer cosas increibles.')
          break
        case GPSState.DENIED:
          setMessage('Es una pena que no nos permitas acceder a tu ubicacion.')
          setDenied(true)
          break
        case GPSState.AUTHORIZED_ALWAYS:
          setDenied(false)
          break
        case GPSState.AUTHORIZED_WHENINUSE:
          setDenied(false)
          break
      }
    })
    GPSState.requestAuthorization(GPSState.AUTHORIZED_WHENINUSE)

    return () => {
      GPSState.removeListener()
    }
  }, [])

  return { message, denied }
}

export default useStatusGps
