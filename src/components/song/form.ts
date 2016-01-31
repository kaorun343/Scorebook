'use strict';
import component = require('vue-class-component');
import { Song, Part } from '../../store/state';
import { prop, Data, watch } from 'vue-property-decorator';
import { grades } from '../../constants/constants';

@component({
    template: require('./form.html'),
    filters: {
        year: {
            write: (value: number) => (value < 1971 ? 1971 : value)
        },
        month: {
            write: (value: number) => (value > 12 ? 12 : (value < 1 ? 1 : value))
        },
        page: {
            write: (value: number) => (value < 1 ? 1 : value)
        }
    }
})
@Data(() => ({
    grades
}))
export class SongForm {
    @prop({ type: Object, default: () => (new Song()) })
    song: Song;

    grades: string[];

    @watch('song.people')
    peopleChanged(val: number, oldVal: number) {
        console.log(val, oldVal);
        if (val > oldVal) {
            while (val > this.song.parts.length) {
                this.song.parts.push(new Part());
            }
        } else {
            while (val < this.song.parts.length) {
                this.song.parts.pop();
            }
        }
    }
}
