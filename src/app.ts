'use strict';
import component = require('vue-class-component');
import { Data } from 'vue-property-decorator';
import { Navbar } from './components/navbar/navbar';


@component
@Data(() => ({
    active: '',
    auth: false
}))
export class App {
    static template = require('./app.html');
    static components = { Navbar };

    active: string;
    auth: boolean;
}
