'use strict';
import Component from 'vue-class-component';
import Cell from './cell';
import {Store} from 'vuex';
import State, {Song} from '../../store/state';
import {addSongs} from '../../store/actions';
import {mutationTypes} from '../../store/mutations';

@Component({
    template: require('./songs.html'),
    components: { Cell },
    vuex: {
        getters: {
            modal: (state: State) => state.modals.songs,
            loading: (state: State) => state.loading,
            songs: (state: State) => state.songs
        },
        actions: {
            addSongs,
            close(store: Store<State>) {
                store.dispatch(mutationTypes.CLOSE_MODAL_SONGS);
            }
        }
    }
})
export default class Songs {
    modal: boolean;
    loading: boolean;
    songs: Song[];
}
