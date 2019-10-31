import { COMMERCES } from '../actionTypes'

const INITIAL_STATE = {
  categoryId: 0
}

export const commerces = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMERCES: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
