"use strict"
import { SongObject } from './song'
import { Part } from '../data/part'

export class PartObject extends Parse.Object implements Part {

  static get(id: string): Parse.Promise<PartObject> {
    const query = new Parse.Query(this)
    return query.get(id)
  }

  static findBySong(song: SongObject): Parse.Promise<PartObject[]> {
    const query = new Parse.Query(this)
    query.equalTo("song", song)
    return query.find()
  }

  constructor(options?: any) {
    super("Part", options)
  }

  get type(): string {
    return this.get("type")
  }

  set type(value: string) {
    this.set("type", value)
  }

  get keyboards(): string[] {
    return this.get("keyboards")
  }

  set keyboards(value: string[]) {
    this.set("keyboards", value)
  }

  get song(): SongObject {
    return this.get("song")
  }

  set song(value: SongObject) {
    this.set("song", value)
  }
}
