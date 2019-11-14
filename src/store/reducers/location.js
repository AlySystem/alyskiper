import { LOCATIONDETAILS, REMOVELOCATIONDETAILS } from '../actionTypes'

const INITIAL_STATE = {
  location: {
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134
  },
  directionsDetails: null
}

export const location = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATIONDETAILS: {
      return {
        ...state,
        ...action.payload
      }
    }
    case REMOVELOCATIONDETAILS: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
