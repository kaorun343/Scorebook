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
    }
})
export class Song {
    static route: VueRouter.TransitionHook<any, any, any, Params, any> = {
        data(transition) {
            const { id } = transition.to.params;
            store.actions.showSong(id);
        }
    };

    get song() {
        return store.state.song;
    }
}
