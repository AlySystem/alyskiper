import { combineReducers } from 'redux'

import { user } from './user'
import { location } from './location'
import { commerces } from './commerce'
import { travel } from './travel'
import { drivers } from './driver'
import { favorite } from './favorite'
import { activeTravel } from './activeTravel'
import { address } from './address'
import { direction } from './direction'

const reducers = combineReducers({
  user,
  location,
  commerces,
  travel,
  drivers,
  favorite,
  activeTravel,
  address,
  direction
})

export default reducers
