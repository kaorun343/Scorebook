"use strict";
import {SongsType} from '../actions/ActionType'
import {Song} from '../models/song'

export interface SongsState {
  songsType: SongsType
  callback: (song: Song) => boolean
  songs: Song[]
  isFetching: boolean
}

export const initialState: SongsState = {
  songsType: SongsType.ALBUM,
  callback: null,
  songs: [],
  isFetching: false
}
