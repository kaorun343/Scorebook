'use strict';
import State, { Song } from './state';

export const enum mutationTypes {
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
    START_ADDING_SONGS,
    /**
     * 検索結果に曲を追加する
     */
    ADD_SONGS,
    /**
     * 検索結果の追加が終わる
     */
    FINISH_ADDING_SONGS,
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

export default {
    [mutationTypes.SET_SEARCHTEXT](state: State, text: string) {
        state.searchtext = text;
    },
    [mutationTypes.START_SEARCHING_SONGS](state: State) {
        state.loading = true;
    },
    [mutationTypes.SET_SONGS](state: State, songs: Song[]) {
        state.songs = songs;
    },
    [mutationTypes.FINISH_SEARCHING_SONGS](state: State) {
        state.loading = false;
    },
    [mutationTypes.START_ADDING_SONGS](state: State) {
        state.loading = true;
    },
    [mutationTypes.ADD_SONGS](state: State, songs: Song[]) {
        state.songs = state.songs.concat(songs);
    },
    [mutationTypes.FINISH_ADDING_SONGS](state: State) {
        state.loading = false;
    },
    [mutationTypes.OPEN_MODAL_SONGS](state: State) {
        state.modals.songs = true;
    },
    [mutationTypes.CLOSE_MODAL_SONGS](state: State) {
        state.modals.songs = false;
    },
    [mutationTypes.SET_A_SONG](state: State, song: Song) {
        state.song = song;
    }
};
