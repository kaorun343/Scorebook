'use strict';
import component = require('vue-class-component');
import { Song } from '../../../data/song';
import { Part } from '../../../data/part';
import { Video } from '../../../data/video';
import { SongObject } from '../../../objects/song';
import { PartObject } from '../../../objects/part';
import { VideoObject } from '../../../objects/video';
import { SongForm } from '../form/song';
import { PartsForm } from '../form/parts';
import { VideosForm } from '../form/videos';

interface Query {
    year: string;
    month: string;
}

@component
export class Create {
    static template = require('./create.html');
    static components = { SongForm, PartsForm, VideosForm };

    song: Song;
    videos: Video[];
    parts: Part[];
    id: string;

    enableSubmitButton: boolean;

    $refs: {
        song: SongForm;
        parts: PartsForm;
        videos: VideosForm;
    };

    $route: VueRouter.$route<any, any, Query>;

    protected data(): any {
        return {
            id: '',
            song: new Song(),
            parts: [new Part()],
            videos: [],
            enableSubmitButton: true
        };
    }

    static route: VueRouter.TransitionHook<any, any, any, any, Query> = {
        data: function(transition) {
            const { query: {year, month} } = transition.to;
            return new Promise((resolve) => {
                setTimeout((date: Date) => {
                    resolve({
                        'song.year': Number(year) || date.getFullYear(),
                        'song.month': Number(month) || date.getMonth() + 1
                    });
                }, 0, new Date());
            });
        }
    };

    submit() {
        if (!this.enableSubmitButton) {
            return;
        }
        this.enableSubmitButton = false;
        const song = new SongObject(this.$refs.song.song);
        song.set('people', this.$refs.parts.parts.length);
        song.save<SongObject>().then((song) => {
            this.id = song.id;
            return Promise.all(<any>[
                ...PartObject.save(song, this.$refs.parts.parts),
                ...VideoObject.save(song, this.$refs.videos.videos)
            ]);
        }).then((result: any) => {
            this.$route.router.go({ name: 'song', params: { id: this.id } });
        }, (err: any) => { console.error(err); });
    }
}
