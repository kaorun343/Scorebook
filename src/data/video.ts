'use strict';

export class Video {
    title: string;
    url: string;

    constructor() {
        this.title = '';
        this.url = '';
    }
}

export type VideoWidId = (Video & { id?: string });
