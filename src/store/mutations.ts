'use strict';
import { State, Song } from './state';

export const enum Types {
    /**
     * 検索テキストを代入する
     */
    SET_SEARCHTEXT,
    /**
     * 曲を検索し始める
     */
    START_SEARCHING_SONGS,
    /**
     * 曲のリストを代入する
     */
    SET_SONGS,
    /**
     * 曲を検索し終える
     */
    FINISH_SEARCHING_SONGS,
    /**
     * さらに検索結果を読み込む
     */
    START_LOADING_SONGS,
    /**
     * 検索結果に曲を追加する
     */
    ADD_SONGS,
    /**
     * 検索結果の追加が終わる
     */
    FINISH_LOADING_SONGS,
    /**
     * 検索結果のモーダル画面を開く
     */
    OPEN_MODAL_SONGS,
    /**
     * 検索結果のモーダル画面を閉じる
     */
    CLOSE_MODAL_SONGS,
    /**
     * 曲を代入する
     */
    SET_A_SONG
}

export const mutations = {
    [Types.SET_SEARCHTEXT](state: State, text: string) {
        state.searchtext = text;
    },
    [Types.START_SEARCHING_SONGS](state: State) {
        state.loading = true;
    },
    [Types.FINISH_SEARCHING_SONGS](state: State) {
        state.loading = false;
    },
    [Types.SET_SONGS](state: State, songs: Song[]) {
        state.songs = songs;
    },
    [Types.START_LOADING_SONGS](state: State) {
        state.loading = true;
    },
    [Types.ADD_SONGS](state: State, songs: Song[]) {
        state.songs = state.songs.concat(songs);
    },
    [Types.FINISH_LOADING_SONGS](state: State) {
        state.loading = false;
    },
    [Types.OPEN_MODAL_SONGS](state: State) {
        state.modals.songs = true;
    },
    [Types.CLOSE_MODAL_SONGS](state: State) {
        state.modals.songs = false;
    },
    [Types.SET_A_SONG](state: State, song: Song) {
        state.song = song;
    }
};
