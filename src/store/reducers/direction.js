import { DIRECCION } from '../actionTypes'

const INITIAL_STATE = {
  directions: null
}

export const direction = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DIRECCION: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
