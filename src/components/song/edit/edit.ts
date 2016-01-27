'use strict';
import Vue = require('vue');
const _ = Vue.util;
import component = require('vue-class-component');
import { Data } from 'vue-property-decorator';
import { App } from '../../../app';
import { SongObject, Song, SongWithId } from '../../../objects/song';
import { PartObject, PartWithId } from '../../../objects/part';
import { VideoObject, VideoWithId } from '../../../objects/video';
import { SongForm } from '../form/song';
import { PartsForm } from '../form/parts';
import { VideosForm } from '../form/videos';

interface Params {
    id: string;
}

@component
@Data(() => ({
    song: new Song,
    parts: [],
    videos: [],
    enableSubmitButton: true
}))
export class Edit {
    static template = require('./edit.html');
    static components = { SongForm, PartsForm, VideosForm };

    song: SongWithId;
    parts: PartWithId[];
    videos: VideoWithId[];

    enableSubmitButton: boolean;

    $refs: {
        song: SongForm;
        parts: PartsForm;
        videos: VideosForm;
    };

    $route: VueRouter.$route<App, any, any>;

    static route: VueRouter.TransitionHook<App, any, any, Params, any> = {
        data: function(transition) {
            const { id } = transition.to.params;
            return SongObject.get(id).then((song: SongObject) => {
                return Promise.all([song, PartObject.findBySong(song), VideoObject.findBySong(song)] as any[]);
            }).then(([song, parts, videos]: [SongObject, PartObject[], VideoObject[]]) => {
                const self: Edit = this;
                self.$refs.videos.isEmpty = videos.length === 0;
                self.$refs.parts.isRemovable = parts.length > 1;
                return {
                    song: _.extend({ id: song.id }, song.attributes),
                    parts: parts.map(({id, attributes}: PartObject) => _.extend({ id }, attributes)),
                    videos: videos.map(({id, attributes}: VideoObject) => _.extend({ id }, attributes))
                };
            });
        },
        canActivate: function(transition) {
            return transition.to.router.app.auth;
        }
    };

    submit() {
        if (!this.enableSubmitButton) {
            return;
        }
        this.enableSubmitButton = false;
        const { song, parts, videos } = this.$refs;
        SongObject.update(song.song.id, song.song, parts.parts.length).then((song) => {
            return Promise.all([
                ...PartObject.update(parts.parts, song),
                ...VideoObject.update(videos.videos, song)
            ] as Parse.IPromise<Parse.Object>[]);
        }).then((objects: any) => {
            return Promise.all([
                ...PartObject.destroy(parts.toBeDestroyed),
                ...VideoObject.destroy(videos.toBeDestroyed)
            ] as Parse.IPromise<Parse.Object>[]);
        }).then((objects: any) => {
            this.$route.router.go({ name: 'song', params: { id: this.song.id } });
        }, (err: any) => { console.error(err); });
    }
}
