'use strict';
import Vue = require('vue');
import component = require('vue-class-component');
import { Data } from 'vue-property-decorator';
import { SongObject, Song } from '../../objects/song';

interface Query {
    title: string;
    year: string;
    month: string;
}

@component
@Data(() => ({
    title: '',
    songs: [] as Song[]
}))
export class Songs {
    static template = require('./songs.html');

    $route: VueRouter.$route<any, any, Query>;

    title: string;
    songs: Song[];

    static route: VueRouter.TransitionHook<any, any, any, any, Query> = {
        data: function(transition) {
            const { query } = transition.to;
            if (query.title) {
                return SongObject.findByQuery(query).then((songs) => {
                    return ({
                        title: query.title,
                        songs: songs.map(({id, attributes}) => Vue.util.extend({ id }, attributes))
                    });
                });
            } else {
                transition.next({
                    title: '',
                    songs: []
                });
            }
        }
    };

    search() {
        if (this.title) {
            this.$route.router.go({ name: 'songs', query: { title: this.title } });
        } else {
            this.$route.router.go({ path: '/songs' });
        }
    }
}
