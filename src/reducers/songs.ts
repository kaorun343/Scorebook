"use strict";
import { ActionType, SongsType } from '../actions/ActionType'
import { SongsActionResult } from '../actions/index'
import { Song, SongStorage } from '../models/song'
import _ = require('lodash')
import { SongsState, initialState } from '../states/songs'

export function songs(state = initialState, action: SongsActionResult): SongsState {
  switch(action.type) {
    case ActionType.SET_SONGS_TYPE:
      return <SongsState>_.assign({}, state, {
        songsType: action.songsType,
        songs: state.songs
      })
    case ActionType.REQUEST_SONGS:
      return <SongsState>_.assign({}, state, {
        isFetching: true
      })
    case ActionType.RECEIVE_SONGS:
      return <SongsState>_.assign({}, state, {
        isFetching: false,
        songs: action.songs
      })
    default:
      return state
  }
}
