'use strict';
import Component from 'vue-class-component';
import State, {Song as SongData} from '../../store/state';
import {showSong} from '../../store/actions';

interface Params {
    id: string;
}

@Component({
    template: require('./song.html'),
    filters: {
        exist: (value: number) => (value ? 'あり' : 'なし')
    },
    route: {
        data(transition: vuejs.Transition<any, any, any, Params, any>) {
            const { id } = transition.to.params;
            this.showSong(id);
        }
    },
    vuex: {
        getters: {
            song: (state: State) => state.song
        },
        actions: {
            showSong
        }
    }
})
export default class Song {
    song: SongData;
}
