'use strict';
import component = require('vue-class-component');
import { Song, SongWithId } from '../../../data/song';
import { prop, watch, Data } from 'vue-property-decorator';
import { grades, types } from '../../../constants/constants';

@component
@Data(() => ({
    grades,
    types
}))
export class SongForm {
    static template = require('./song.html');

    @prop({ type: Object, default: () => (new Song()) })
    song: SongWithId;

    grades: string[];
    types: string[];

    @watch('song.year')
    protected clampYear(value: number) {
        if (value < 1971) {
            this.song.year = 1971;
        }
    }

    @watch('song.month')
    protected clampMonth(value: number) {
        if (value > 12) {
            this.song.month = 12;
        } else if (value < 1) {
            this.song.month = 1;
        }
    }

    @watch('song.page')
    protected clampPage(value: number) {
        if (value < 1) {
            this.song.page = 1;
        }
    }
}
