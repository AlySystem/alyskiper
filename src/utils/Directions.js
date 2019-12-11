import PolyLine from '@mapbox/polyline'
// Import utils
import { keys } from '../utils/keys'

export const routeDirection = async (placeId, latitude, longitude) => {
  try {
    const apiUrl = `${keys.googleMaps.directions}json?origin=${latitude}, ${longitude}&destination=place_id:${placeId}&key=${keys.googleMaps.apiKey}`
    const response = await fetch(apiUrl)
    const result = await response.json()

    const steps = result.routes[0].legs[0]
    const points = PolyLine.decode(result.routes[0].overview_polyline.points)
    const pointCoords = points.map(point => {
      return { latitude: point[0], longitude: point[1] }
    })
    return { pointCoords, steps }
  } catch (error) {
    console.error(error.message)
  }
}
