'use strict';
import component = require('vue-class-component');
import {store} from '../../store/store';

interface Params {
    id: string;
}

@component
export class Song {
    static template = require('./song.html');
    static filters = {
        exist: (value: boolean) => (value ? 'あり' : 'なし')
    };

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
