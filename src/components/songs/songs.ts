'use strict';
import Component from 'vue-class-component';
import Cell from './cell';
import store from '../../store/store';
import { Types } from '../../store/mutations';

@Component({
    template: require('./songs.html'),
    components: { Cell: Cell }
})
export default class Songs {
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
