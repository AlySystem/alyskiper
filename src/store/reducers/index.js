import { combineReducers } from 'redux'

import { user } from './user'
import { active } from './active'

const reducers = combineReducers({
  user,
  active
})

export default reducers
