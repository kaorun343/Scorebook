"use strict"

/**
 * アクションの種類
 */
export const enum ActionType {
  ADD_SONG,
  UPDATE_SONG,
  REMOVE_SONG,

  SET_SONGS_TYPE,

  REQUEST_SONGS,
  RECEIVE_SONGS
}

/**
 * 曲のグループ分けの種類
 */
export const enum SongsType {
  ALBUM,
  ARTIST,
  IS_STAR
}
