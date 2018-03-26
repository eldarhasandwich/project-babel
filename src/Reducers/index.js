import { combineReducers } from 'redux'

import state from './state';
import attendees from './attendees';
import singleAttendee from './singleAttendee';
import userSession from './userSession';
import { audioReducer as audio } from 'redux-audio-fixed'

const rootReducer = combineReducers({
  state,
  attendees,
  singleAttendee,
  userSession,
  audio
})

export default rootReducer