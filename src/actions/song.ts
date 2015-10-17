"use strict";
import { Song, SongStorage } from '../models/song'
import { ActionType } from './ActionType'

/**
 * 曲を操作した時の返り値
 */
export interface SongActionResult {
  type: ActionType,
  song: Song
}

/**
 * 新しく曲を追加する
 * @param  {Song}             song [description]
 * @return {SongActionResult}      [description]
 */
export function addSong(song: Song): SongActionResult {
  return {
    type: ActionType.ADD_SONG,
    song
  }
}

/**
 * 曲を更新する
 * @param  {Song}             song [description]
 * @return {SongActionResult}      [description]
 */
export function updateSong(song: Song): SongActionResult {
  return {
    type: ActionType.UPDATE_SONG,
    song
  }
}

/**
 * 曲を削除する
 * @param  {Song}             song [description]
 * @return {SongActionResult}      [description]
 */
export function removeSong(song: Song): SongActionResult {
  return {
    type: ActionType.REMOVE_SONG,
    song
  }
}
