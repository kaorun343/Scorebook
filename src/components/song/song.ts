'use strict';
import component = require('vue-class-component');
import {store} from '../../store/store';

interface Params {
    id: string;
}

@component({
    template: require('./song.html'),
    filters: {
        exist: (value: number) => (value ? 'あり' : 'なし')
    },
    route: {
        data(transition: VueRouter.Transition<any, any, any, Params, any>) {
            const { id } = transition.to.params;
            store.actions.showSong(id);
        }
    }
})
export class Song {
    get song() {
        return store.state.song;
    }
}
