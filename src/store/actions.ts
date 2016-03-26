'use strict';
import {Store} from 'vuex';
import State, {Song} from './state';
import {mutationTypes} from './mutations';

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


export function addSongs(store: Store<State>) {
    if (store.state.loading) {
        return;
    }
    store.dispatch(mutationTypes.START_ADDING_SONGS);
    setTimeout(function() {
        store.dispatch(mutationTypes.ADD_SONGS, songs());
        store.dispatch(mutationTypes.FINISH_ADDING_SONGS);
    }, 500);
}

export function search(store: Store<State>, text: string) {
    store.dispatch(mutationTypes.OPEN_MODAL_SONGS);
    if (text === store.state.searchtext) {
        return;
    }
    store.dispatch(mutationTypes.SET_SEARCHTEXT, text);
    store.dispatch(mutationTypes.START_SEARCHING_SONGS);
    setTimeout(function() {
        store.dispatch(mutationTypes.SET_SONGS, songs());
        store.dispatch(mutationTypes.FINISH_SEARCHING_SONGS);
    }, 1000);
}

export function showSong(store: Store<State>, id: string) {
    setTimeout(function() {
        const song = new Song();
        song.title = 'ワーク・ソング';
        song.artist = 'ナット・アダレイ';
        song.grade = '5~4級';
        store.dispatch(mutationTypes.SET_A_SONG, song);
    }, 500);
}
