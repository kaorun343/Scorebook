'use strict';
import { grades, types } from '../constants/constants';

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

export type SongWithId = (Song & { id?: string });

export class SongObject extends Parse.Object {

    static get(id: string) {
        const query = new Parse.Query(SongObject);
        return query.get(id);
    }

    static findByAlbum(year: number, month: number) {
        const query = new Parse.Query(SongObject);
        query.equalTo('year', year);
        query.equalTo('month', month);
        return query.find<SongObject[]>();
    }

    static findByQuery(context: any) {
        const title = new Parse.Query(SongObject);
        title.matches('title', new RegExp(context.title), null);
        const lead = new Parse.Query(SongObject);
        lead.matches('lead', new RegExp(context.title), null);
        return Parse.Query.or(title, lead).find<SongObject[]>();
    }

    static update(id: string, song: SongWithId, people: number) {
        return SongObject.get(id).then((target: SongObject) => {
            target.set('year', song.year);
            target.set('month', song.month);
            target.set('page', song.page);
            target.set('title', song.title);
            target.set('lead', song.lead);
            target.set('grade', song.grade);
            target.set('type', song.type);
            target.set('people', people);
            return target.save<Parse.Promise<SongObject>>();
        });
    }

    constructor(options?: any) {
        super('Song', options);
    }

    attributes: Song;
}
