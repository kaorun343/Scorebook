'use strict';
import component = require('vue-class-component');
import { Data } from 'vue-property-decorator';
import { SongObject, Song as SongData } from '../../objects/song';
import { PartObject } from '../../objects/part';
import { VideoObject, Video as VideoData } from '../../objects/video';

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
@Data(() => ({
    song: new SongData(),
    parts: [],
    videos: [],
    previousPath: ''
}))
export class Song {
    static template = require('./song.html');
    static filters = {
        exist: (value: boolean) => (value ? 'あり' : 'なし')
    };

    song: SongData;
    parts: PartTableRow[];
    videos: VideoData[];
    previousPath: string;

    static route: VueRouter.TransitionHook<any, any, any, Params, any> = {
        data: function(transition) {
            const { id } = transition.to.params;
            return SongObject.get(id).then((song: SongObject) => {
                return Promise.all([song, PartObject.findBySong(song), VideoObject.findBySong(song)] as any[]);
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
