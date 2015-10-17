"use strict";
import { Song, SongStorage } from '../models/song'
import { ThunkInterface } from 'redux-thunk'
import { ActionType, SongsType } from './ActionType'

/**
 * 曲のリストを操作した時の返り値
 */
export interface SongsActionResult {
  type: ActionType
  songsType?: SongsType
  songs?: Song[]
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

type callback = (song: Song) => boolean

function requestSongs(callback: callback) {
  return {
    type: ActionType.REQUEST_SONGS,
    callback
  }
}

function receiveSongs(callback: callback, songs: Song[]) {
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

    return (<any>store).ready
    .then(() => store.select(callback))
    .then((songs: Song[]) => dispatch(receiveSongs(callback, songs)))
  }
}
