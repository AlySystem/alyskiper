import { STATUSORDER, REMOVESTATUSORDER } from '../actionTypes'

const INITIAL_STATE = {
  message: null
}

export const statusOrder = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATUSORDER: {
      return {
        ...action.payload
      }
    }
    case REMOVESTATUSORDER: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
