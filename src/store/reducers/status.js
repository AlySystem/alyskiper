const INITIAL_STATE = {
  id: null
}

export const status = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ESTADOVIAJE': {
      return {
        ... state,
        ...action.payload
      }
    }
    default:
      return state
  }
}
