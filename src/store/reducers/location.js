import { LOCATION, REMOVELOCATION } from '../actionTypes'

const INITIAL_STATE = {
  latitude: null,
  longitude: null
}

export const location = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION: {
      return {
        ...state,
        ...action.payload
      }
    }
    case REMOVELOCATION: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
