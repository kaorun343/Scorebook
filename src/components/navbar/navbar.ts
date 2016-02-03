'use strict';
import Component from 'vue-class-component';
import { prop } from 'vue-property-decorator';

@Component({})
export class Navbar {
    static template = require('./navbar.html');

    @prop({ type: String, default: '/' })
    active: string;

    @prop({ type: Boolean, default: false })
    auth: boolean;

}
