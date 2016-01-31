'use strict';
import VueComponent = require('vue-class-component');
import {SongForm} from './form';

@VueComponent
export class Create {
    static template = require('./create.html');
    static components = { SongForm };

    $refs: {
        form: SongForm
    };

    save() {
        //
    }
}
