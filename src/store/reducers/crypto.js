import { REMOVECRYPTO, SETCRYPTO } from '../actionTypes'

const INITIAL_STATE = {}

export const crypto = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETCRYPTO: {
            return {
                ...state,
                ...action.payload
            }
        }
        case REMOVECRYPTO: {
            return INITIAL_STATE
        }
        default:
            return state
    }
}
