import { ACTIVETRAVEL, REMOVETRALVEL } from '../actionTypes'

const INITIAL_STATE = {
  travel: null
}

export const activeTravel = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVETRAVEL: {
      return {
        ...state,
        ...action.payload
      }
    }
    case REMOVETRALVEL: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
