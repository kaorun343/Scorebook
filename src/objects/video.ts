'use strict';
import { SongObject } from './song';

export class Video {
    title: string;
    url: string;

    constructor() {
        this.title = '';
        this.url = '';
    }
}

export type VideoWithId = (Video & { id?: string });

export class VideoObject extends Parse.Object {

    static get(id: string): Parse.Promise<VideoObject> {
        const query = new Parse.Query(this);
        return query.get(id);
    }

    static findBySong(song: SongObject): Parse.Promise<VideoObject[]> {
        const query = new Parse.Query(this);
        query.equalTo('song', song);
        return query.find();
    }

    static save(song: SongObject, videos: Video[]): Parse.Promise<VideoObject>[] {
        return videos.map((v) => {
            const video = new VideoObject(v);
            video.set('song', song);
            return video.save();
        });
    }

    static update(videos: VideoWithId[], song: SongObject) {
        return videos.map((video) => {
            if (video.id) {
                VideoObject.get(video.id).then((v: VideoObject) => {
                    v.set('title', video.title);
                    v.set('url', video.url);
                    return v.save<VideoObject>();
                });
            } else {
                const v = new VideoObject(video);
                v.set('song', song);
                return v.save<VideoObject>();
            }
        });
    }

    static destroy(videoIds: string[]) {
        return videoIds.map((id) => {
            return VideoObject.get(id).then((video: VideoObject) => {
                return video.destroy<VideoObject>();
            });
        });
    }

    constructor(options?: any) {
        super('Video', options);
    }

    attributes: Video;
}
