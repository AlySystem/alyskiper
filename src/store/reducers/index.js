import { combineReducers } from 'redux'

import { user } from './user'
import { location } from './location'
import { commerces } from './commerce'
import { services } from './services'
import { travel } from './travel'
import { drivers } from './driver'
import { favorite } from './favorite'

const reducers = combineReducers({
  user,
  location,
  commerces,
  services,
  travel,
  drivers,
  favorite
})

export default reducers
