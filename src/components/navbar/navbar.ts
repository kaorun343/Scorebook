'use strict';
import component = require('vue-class-component');
import { prop } from '../../decorators/decorators';

@component
export class Navbar {
    static template = require('./navbar.html');

    @prop({ type: String, default: '/' })
    active: string;

}
