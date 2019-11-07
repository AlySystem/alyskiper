import { ADDRESS, REMOVEADDRESS } from '../actionTypes'

const INITIAL_STATE = {
  address: { flag: true }
}

export const address = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDRESS: {
      return {
        ...action.payload
      }
    }
    case REMOVEADDRESS: {
      return INITIAL_STATE
    }
    default:
      return state
  }
}
