'use strict';
import {expect} from 'chai';
import State, {Song} from './state';
import mutations, {mutationTypes} from './mutations';

describe('mutations', () => {
    it('SET_SEARCHTEXT', () => {
        const state = new State();
        const text = 'song name';
        mutations[mutationTypes.SET_SEARCHTEXT](state, text);
        expect(state.searchtext).to.equal(text);
    });

    it('START_SEARCHING_SONGS', () => {
        const state = new State();
        mutations[mutationTypes.START_SEARCHING_SONGS](state);
        expect(state.loading).to.be.true;
    });

    it('SET_SONGS', () => {
        const state = new State();
        const songs = [new Song()];
        mutations[mutationTypes.SET_SONGS](state, songs);
        expect(state.songs).to.equal(songs);
    });

    it('FINISH_SEARCHING_SONGS', () => {
        const state = new State();
        state.loading = true;
        mutations[mutationTypes.FINISH_SEARCHING_SONGS](state);
        expect(state.loading).to.be.false;
    });

    it('START_ADDING_SONGS', () => {
        const state = new State();
        mutations[mutationTypes.START_ADDING_SONGS](state);
        expect(state.loading).to.be.true;
    });

    it('ADD_SONGS', () => {
        const state = new State();
        const song = new Song();
        mutations[mutationTypes.ADD_SONGS](state, [song]);
        expect(state.songs[state.songs.length - 1]).to.equal(song);
    });

    it('FINISH_ADDING_SONGS', () => {
        const state = new State();
        state.loading = true;
        mutations[mutationTypes.FINISH_ADDING_SONGS](state);
        expect(state.loading).to.be.false;
    });

    it('OPEN_MODAL_SONGS', () => {
        const state = new State();
        state.modals.songs = false;
        mutations[mutationTypes.OPEN_MODAL_SONGS](state);
        expect(state.modals.songs).to.be.true;
    });

    it('CLOSE_MODAL_SONGS', () => {
        const state = new State();
        state.modals.songs = true;
        mutations[mutationTypes.CLOSE_MODAL_SONGS](state);
        expect(state.modals.songs).to.be.false;
    });

    it('SET_A_SONG', () => {
        const state = new State();
        const song = new Song();
        mutations[mutationTypes.SET_A_SONG](state, song);
        expect(state.song).to.equal(song);
    });

});
