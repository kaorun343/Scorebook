'use strict';
import component = require('vue-class-component');
import { prop, Data } from 'vue-property-decorator';
import { VideoWidId } from '../../../data/video';

@component
@Data(() => ({
    toBeDestroyed: [] as string[],
    isEmpty: true
}))
export class VideosForm {
    static template = require('./videos.html');

    toBeDestroyed: string[];
    isEmpty: boolean;

    @prop({ type: Array, default: () => ([] as VideoWidId[]) })
    videos: VideoWidId[];

    add() {
        this.videos.push({ title: '', url: '' });
        if (this.isEmpty) {
            this.isEmpty = false;
        }
    }

    remove(video: VideoWidId) {
        if (video.id) {
            this.toBeDestroyed.push(video.id);
        }
        this.videos.$remove(video);
        if (this.videos.length === 0) {
            this.isEmpty = true;
        }
    }
}
