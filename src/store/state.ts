'use strict';
import {types, grades} from '../constants/constants';

export class Part {
    type: string;
    keyboards: string[];

    constructor() {
        this.type = 'エレクトーン';
        this.keyboards = ['上鍵盤', '下鍵盤', 'ペダル鍵盤', 'リズム'];
    }
}

export class Video {
    title: string;
    url: string;

    constructor() {
        this.title = '';
        this.url = '';
    }
}

export class Song {
    title: string;
    lead: string;
    artist: string;
    year: number;
    month: number;
    page: number;
    type: string;
    grade: string;
    people: number;
    id: string;
    parts: Part[];
    videos: Video[];

    constructor() {
        this.title = '';
        this.lead = '';
        this.artist = '';

        const date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth();

        this.page = 1;
        this.type = types[0];
        this.grade = grades[0];
        this.people = 1;
    }
}

export class State {
    songs: Song[] = [];
    loading = false;
    searchtext = '';
    modals = {
        songs: false
    };
}
