'use strict';
import component = require('vue-class-component');
import { prop } from 'vue-property-decorator';

@component({})
export class Navbar {
    static template = require('./navbar.html');

    @prop({ type: String, default: '/' })
    active: string;

    @prop({ type: Boolean, default: false })
    auth: boolean;

}
