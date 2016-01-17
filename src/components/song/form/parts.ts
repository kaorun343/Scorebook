'use strict';
import component = require('vue-class-component');
import { prop } from 'vue-property-decorator';
import { Part, PartWithId } from '../../../data/part';

@component
export class PartsForm {
    static template = require('./parts.html');

    toBeDestroyed: string[];
    isRemovable: boolean;

    protected data(): any {
        return {
            toBeDestroyed: [],
            isRemovable: true
        };
    }

    @prop({ type: Array, default: () => ([new Part()]) })
    parts: PartWithId[];

    add() {
        this.parts.push({ type: '', keyboards: ['上鍵盤', '下鍵盤', 'ペダル鍵盤'] });
        if (!this.isRemovable) {
            this.isRemovable = true;
        }
    }

    remove(part: PartWithId) {
        if (part.id) {
            this.toBeDestroyed.push(part.id);
        }
        this.parts.$remove(part);
        if (this.parts.length === 1) {
            this.isRemovable = false;
        }
    }
}
