import { USERDATA, USERREMOVEDATA } from '../actionTypes'

const INITIAL_STATE = {
  auth: false,
  userToken: null,
  userId: null,
  firstName: null,
  lastName: null,
  userName: null,
  email: null,
  phoneNumber: null,
  avatar: null,
  country: null,
  country_id: null,
  city_id: null,
  cityName: null,
  iso: null
}

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERDATA: {
      return { ...action.payload }
    }
    case USERREMOVEDATA: {
      return null
    }

    default:
      return state
  }
}
