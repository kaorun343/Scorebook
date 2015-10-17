import { combineReducers } from 'redux'
import { song } from './song'
import { songs } from './songs'

export const scorebookApp = combineReducers({
  song,
  songs
})
