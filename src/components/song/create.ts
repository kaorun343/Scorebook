'use strict';
import VueComponent = require('vue-class-component');
import {SongForm} from './form';

@VueComponent({
    template: require('./create.html'),
    components: { SongForm }
})
export class Create {
    $refs: {
        form: SongForm
    };

    save() {
        //
    }
}
