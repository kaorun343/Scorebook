'use strict';
import { SongObject } from './song';
import { Part, PartWithId } from '../data/part';

export class PartObject extends Parse.Object {

    static get(id: string): Parse.Promise<PartObject> {
        const query = new Parse.Query(this);
        return query.get(id);
    }

    static findBySong(song: SongObject) {
        const query = new Parse.Query(this);
        query.equalTo('song', song);
        return query.find<PartObject[]>();
    }

    static save(song: SongObject, parts: Part[]) {
        return parts.map((p) => {
            const part = new PartObject(p);
            part.set('song', song);
            return part.save<PartObject>();
        });
    }

    static update(parts: PartWithId[], song: SongObject) {
        return parts.map((part) => {
            if (part.id) {
                return PartObject.get(part.id).then((p: PartObject) => {
                    p.set('type', part.type);
                    p.set('keyboards', part.keyboards);
                    return p.save<PartObject>();
                });
            } else {
                const p = new PartObject(part);
                p.set('song', song);
                return p.save<PartObject>();
            }
        });
    }

    static destroy(partIds: string[]) {
        return partIds.map((id) => {
            return PartObject.get(id).then((part: PartObject) => {
                return part.destroy<PartObject>();
            });
        });
    }

    constructor(options?: any) {
        super('Part', options);
    }

    attributes: Part;
}
