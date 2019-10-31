import { combineReducers } from 'redux'

import { user } from './user'
import { location } from './location'
import { commerces } from './commerce'

const reducers = combineReducers({
  user,
  location,
  commerces
})

export default reducers
