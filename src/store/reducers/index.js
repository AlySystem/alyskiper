import { combineReducers } from 'redux'

import { user } from './user'
import { location } from './location'
import { commerces } from './commerce'
import { services } from './services'

const reducers = combineReducers({
  user,
  location,
  commerces,
  services
})

export default reducers
