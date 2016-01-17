'use strict';
import component = require('vue-class-component');
import { prop } from 'vue-property-decorator';

@component
export class Pagination {

    static template = require('./pagination.html');

    @prop({ type: Number, default: (new Date).getFullYear() })
    year: number;
}
