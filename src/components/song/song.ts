'use strict';
import Component from 'vue-class-component';
import store from '../../store/store';

interface Params {
    id: string;
}

@Component({
    template: require('./song.html'),
    filters: {
        exist: (value: number) => (value ? 'あり' : 'なし')
    },
    route: {
        data(transition: vuerouter.Transition<any, any, any, Params, any>) {
            const { id } = transition.to.params;
            store.actions.showSong(id);
        }
    }
})
export default class Song {
    get song() {
        return store.state.song;
    }
}
