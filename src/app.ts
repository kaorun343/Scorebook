'use strict';
import component = require('vue-class-component');
import { Data } from 'vue-property-decorator';
import { Songs } from './components/songs/songs';


@component
@Data(() => ({
    text: '',
    modal: false
}))
export class App {
    static template = require('./app.html');
    static components = { Songs };

    text: string;
    modal: boolean;

    search() {
      this.modal = true;
    }

    auth: boolean;
}
