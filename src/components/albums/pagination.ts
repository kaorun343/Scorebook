'use strict';
import Component from 'vue-class-component';
import { prop } from 'vue-property-decorator';

@Component({})
export class Pagination {

    static template = require('./pagination.html');

    @prop({ type: Number, default: (new Date).getFullYear() })
    year: number;
}
