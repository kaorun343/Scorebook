'use strict';
import {Store} from 'vuex';
import {State, Song} from './state';
import {Types} from './mutations';

export interface Actions {
    search(text: string): void;
    addSongs(): void;
    showSong(id: string): void;
}

const songs = () => ([
    {
        title: '双頭の鷲の旗の下に',
        artist: 'ワーグナー',
        lead: 'ハプスブルグ王朝のオーストリア・ハンガリー帝国を謳った曲',
        year: 2007,
        month: 1,
        grade: '6級',
        id: 200701
    },
    {
        title: 'アメリカン・パトロール',
        artist: 'ミーチャム',
        lead: 'アメリカ西部の民謡',
        year: 2008,
        month: 2,
        grade: '7級',
        id: 200802
    },
    {
        title: '星条旗よ永遠なれ',
        artist: 'スーザ',
        lead: 'アメリカ合衆国の公式行進曲',
        year: 2009,
        month: 3,
        grade: '5級',
        id: 200903
    }
]);

export namespace actions {
    export function addSongs(store: Store<State, Actions>) {
        if (store.state.loading) {
            return;
        }
        store.dispatch(Types.START_LOADING_SONGS);
        setTimeout(function() {
            store.dispatch(Types.ADD_SONGS, songs());
            store.dispatch(Types.FINISH_LOADING_SONGS);
        }, 500);
    }

    export function search(store: Store<State, Actions>, text: string) {
        store.dispatch(Types.OPEN_MODAL_SONGS);
        if (text === store.state.searchtext) {
            return;
        }
        store.dispatch(Types.SET_SEARCHTEXT, text);
        store.dispatch(Types.START_SEARCHING_SONGS);
        setTimeout(function() {
            store.dispatch(Types.SET_SONGS, songs());
            store.dispatch(Types.FINISH_SEARCHING_SONGS);
        }, 1000);
    }

    export function showSong(store: Store<State, Actions>, id: string) {
        setTimeout(function() {
            const song = new Song();
            song.title = 'ワーク・ソング';
            song.artist = 'ナット・アダレイ';
            song.grade = '5~4級';
            store.dispatch(Types.SET_A_SONG, song);
        }, 500);
    }
}
