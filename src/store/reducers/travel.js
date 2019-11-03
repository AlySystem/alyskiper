import { DETAILSTRAVEL } from '../actionTypes'

const INITIAL_STATE = {
  travel: null
}

export const travel = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DETAILSTRAVEL: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
