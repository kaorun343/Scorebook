'use strict';
import VueComponent = require('vue-class-component');
import { Cell } from './cell';
import { store } from '../../store/store';
import { Types } from '../../store/mutations';

@VueComponent({
    template: require('./songs.html'),
    components: { Cell }
})
export class Songs {
    get modal() {
        return store.state.modals.songs;
    }

    get loading() {
        return store.state.loading;
    }

    get songs() {
        return store.state.songs;
    }

    load() {
        store.actions.addSongs();
    }

    close() {
      store.dispatch(Types.CLOSE_MODAL_SONGS);
    }
}
