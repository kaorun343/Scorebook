"use strict";
import { Song, SongStorage } from '../models/song'
import { ThunkInterface } from 'redux-thunk'
import { ActionType, SongsType } from './ActionType'

type callback = (song: Song) => boolean

/**
 * 曲のリストを操作した時の返り値
 */
export interface SongsActionResult {
  type: ActionType
  songsType?: SongsType
  songs?: Song[]
  callback?: callback
}

/**
 * 表示する曲のリストのタイプを変更する
 * @param  {SongsType}         songsType [description]
 * @return {SongsActionResult}           [description]
 */
export function setSongsType(songsType: SongsType): SongsActionResult {
  return {
    type: ActionType.SET_SONGS_TYPE,
    songsType
  }
}

/**
 * 曲のリストを更新し始める
 * @param  {callback}          callback [description]
 * @return {SongsActionResult}          [description]
 */
function requestSongs(callback: callback): SongsActionResult {
  return {
    type: ActionType.REQUEST_SONGS,
    callback
  }
}

/**
 * 取得した曲のリストを渡す
 * @param  {callback}          callback [description]
 * @param  {Song[]}            songs    [description]
 * @return {SongsActionResult}          [description]
 */
function receiveSongs(callback: callback, songs: Song[]): SongsActionResult {
  return {
    type: ActionType.RECEIVE_SONGS,
    callback,
    songs
  }
}

/**
 * 検索内容を元に曲のリストを更新する
 * @param  {callback}       callback [description]
 * @return {ThunkInterface}          [description]
 */
export function fetchSongs(callback: callback): ThunkInterface {

  return (dispatch: Redux.Dispatch) => {
    dispatch(requestSongs(callback))

    let store = SongStorage.defaultStorage()

    return store.ready
    .then(() => store.select(callback))
    .then(songs => dispatch(receiveSongs(callback, songs)))
  }
}
