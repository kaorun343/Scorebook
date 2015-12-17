'use strict';
import component = require('vue-class-component');
import { SongObject } from '../../objects/song';
import { PartObject } from '../../objects/part';
import { VideoObject } from '../../objects/video';
import { Song as SongData } from '../../data/song';
import { Video as VideoData } from '../../data/video';

interface Params {
    id: string;
}

interface PartTableRow {
    id: string;
    type: string;
    upper: boolean;
    lower: boolean;
    pedal: boolean;
    rhythm: boolean;
}

@component
export class Song {
    static template = require('./song.html');
    static filters = {
        exist: (value: boolean) => (value ? 'あり' : 'なし')
    };

    song: SongData;
    parts: PartTableRow[];
    videos: VideoData[];

    protected data(): any {
        return {
            song: new SongData(),
            parts: [],
            videos: [],
            previousPath: ''
        };
    }

    static route: VueRouter.TransitionHook<any, any, any, Params, any> = {
        data: function(transition) {
            const { id } = transition.to.params;
            return SongObject.get(id).then((song: SongObject) => {
                return Promise.all(<any>[song, PartObject.findBySong(song), VideoObject.findBySong(song)]);
            }).then(([song, parts, videos]: [SongObject, PartObject[], VideoObject[]]) => {
                return {
                    song: song.attributes,
                    parts: parts.map(({attributes: {type, keyboards}, id}: PartObject): PartTableRow => {
                        const upper = keyboards.indexOf('上鍵盤') > -1;
                        const lower = keyboards.indexOf('下鍵盤') > -1;
                        const pedal = keyboards.indexOf('ペダル鍵盤') > -1;
                        const rhythm = keyboards.indexOf('リズム') > -1;
                        return { id, type, upper, lower, pedal, rhythm };
                    }),
                    videos: videos.map(({attributes: {title, url}, id}: VideoObject) => {
                        return { id, title, url };
                    })
                };
            });
        }
    };
}
