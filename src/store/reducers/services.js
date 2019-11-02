import { SERVICES } from '../actionTypes'

const INITIAL_STATE = {
  services: []
}

export const services = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SERVICES: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
