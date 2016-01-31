'use strict';
import {grades} from '../constants/constants';

export class Part {
    upper: boolean;
    lower: boolean;
    pedal: boolean;
    rhythm: boolean;

    constructor() {
        this.upper = true;
        this.lower = true;
        this.pedal = true;
        this.rhythm = true;
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
    piano: boolean;
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
        this.month = date.getMonth() + 1;

        this.page = 1;
        this.grade = grades[0];
        this.people = 1;
        this.piano = false;

        this.parts = [new Part()];
        this.videos = [];
    }
}

export class State {
    songs = [] as Song[];
    song = new Song();
    loading = false;
    searchtext = '';
    modals = {
        songs: false
    };
}
