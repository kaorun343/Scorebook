'use strict';
import Component from 'vue-class-component';
import Songs from '../songs/songs';
import store from '../../store/store';
import {search} from '../../store/actions';

@Component({
    template: require('./app.html'),
    components: { Songs },
    store
})
export default class App {
    text: string;

    data(): any {
        return {
            text: ''
        };
    }

    search() {
        if (this.text.length) {
            search(store, this.text);
        }
    }
}
