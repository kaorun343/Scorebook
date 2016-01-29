'use strict';
import component = require('vue-class-component');
import {Data} from 'vue-property-decorator';
import {Songs} from './components/songs/songs';
import {store} from './store/store';

@component
@Data(() => ({
    text: ''
}))
export class App {
    static template = require('./app.html');
    static components = { Songs };

    text: string;

    search() {
        if (this.text.length) {
            store.actions.search(this.text);
        }
    }

    auth: boolean;
}
