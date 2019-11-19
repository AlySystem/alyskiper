import { DIRECTION, REMOVEDIRECTION } from '../actionTypes'

const INITIAL_STATE = {
  directions: null
}

export const direction = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DIRECTION: {
      return {
        ...state,
        ...action.payload
      }
    }
    case REMOVEDIRECTION: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
