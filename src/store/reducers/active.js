import { ACTIVE } from '../actionTypes'

const INITIAL_STATE = {
  active: false
}

export const active = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVE: {
      return { ...action.payload }
    }
    default:
      return state
  }
}
