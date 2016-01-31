'use strict';
import component = require('vue-class-component');
import {Data} from 'vue-property-decorator';
import {Songs} from './components/songs/songs';
import {store} from './store/store';

@component({
    template: require('./app.html'),
    components: { Songs }
})
@Data(() => ({
    text: ''
}))
export class App {
    text: string;

    search() {
        if (this.text.length) {
            store.actions.search(this.text);
        }
    }
}
