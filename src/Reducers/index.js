import { combineReducers } from 'redux'

import state from './state';
import attendees from './attendees';
import { audioReducer as audio } from 'redux-audio-fixed'

const rootReducer = combineReducers({
  state,
  attendees,
  audio
})

export default rootReducer