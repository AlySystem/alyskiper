import { ADDFAVORITE } from '../actionTypes'

const INITIAL_STATE = {
  favorite: []
}

export const favorite = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDFAVORITE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
