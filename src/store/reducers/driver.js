import { DRIVERS } from '../actionTypes'

const INITIAL_STATE = {
  drivers: []
}

export const drivers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DRIVERS: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
