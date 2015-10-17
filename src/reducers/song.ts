"use strict";
import { ActionType, SongsType } from '../actions/ActionType'
import { SongActionResult} from '../actions/index'
import { Song } from '../models/song'
import _ = require('lodash')

const initialState: Song = null

export function song(state = initialState, action: SongActionResult): Song {
  switch(action.type) {
    case ActionType.ADD_SONG:
      return action.song
    case ActionType.UPDATE_SONG:
      return action.song
    case ActionType.REMOVE_SONG:
      return null
    default:
      return state
  }
}
