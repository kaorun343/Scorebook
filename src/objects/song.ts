'use strict';
import { Song, SongWithId } from '../data/song';

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
        const query = new Parse.Query(SongObject);
        query.matches('title', new RegExp(context.title), null);
        return query.find<SongObject[]>();
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
