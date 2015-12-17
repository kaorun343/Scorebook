'use strict';
import component = require('vue-class-component');
import { prop } from '../../../decorators/decorators';
import { VideoWidId } from '../../../data/video';

@component
export class VideosForm {
    static template = require('./videos.html');

    toBeDestroyed: string[];
    isEmpty: boolean;

    protected data(): any {
        return {
            toBeDestroyed: [],
            isEmpty: true
        };
    }

    @prop({ type: Array, default: () => (<VideoWidId[]>[]) })
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
