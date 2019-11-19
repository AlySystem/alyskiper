import { DETAILSTRAVEL, REMOVEDETAILSTRAVEL } from '../actionTypes'

const INITIAL_STATE = {
  travel: null,
  drive: null
}

export const travel = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DETAILSTRAVEL: {
      return {
        ...state,
        ...action.payload
      }
    }
    case REMOVEDETAILSTRAVEL: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
