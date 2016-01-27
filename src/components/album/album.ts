'use strict';
import Vue = require('vue');
import component = require('vue-class-component');
import { Data } from 'vue-property-decorator';
import { SongObject } from '../../objects/song';
import { Song } from '../../data/song';

interface Params {
    year: string;
    month: string;
}

@component
@Data(() => {
    const date = new Date();
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        songs: [] as (Song & { id: string })[]
    };
})
export class Album {
    static template = require('./album.html');

    year: number;
    month: number;
    songs: (Song & { id: string })[];

    get href(): string {
        return `http://www.ymm.co.jp/magazine/electone/${this.year * 100 + this.month}.php`;
    }

    get nextMonth(): number {
        return this.month === 12 ? 1 : this.month + 1;
    }

    get previousMonth(): number {
        return this.month === 1 ? 12 : this.month - 1;
    }

    get nextYear(): number {
        return this.month === 12 ? this.year + 1 : this.year;
    }

    get previousYear(): number {
        return this.month === 1 ? this.year - 1 : this.year;
    }

    static route: VueRouter.TransitionHook<any, any, any, Params, any> = {
        data: function(transition) {
            const {year, month} = transition.to.params;
            const y = Number(year);
            const m = Number(month);

            return SongObject.findByAlbum(y, m).then((songs) => {
                return songs.map((song) => {
                    const {attributes, id} = song;
                    return Vue.util.extend({ id }, attributes);
                });
            }).then((songs) => ({ songs, year: y, month: m }));
        }
    };
}
