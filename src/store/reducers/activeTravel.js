import { ACTIVETRAVEL } from '../actionTypes'

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
    default:
      return state
  }
}
