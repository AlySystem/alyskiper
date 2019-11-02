import { LOCATION, REMOVEDETAILSLOCATION } from '../actionTypes'

const INITIAL_STATE = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0143,
  longitudeDelta: 0.0134
}

export const location = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION: {
      return {
        ...state,
        ...action.payload
      }
    }
    case REMOVEDETAILSLOCATION: {
      return {
        ...action.payload
      }
    }
    default:
      return state
  }
}
