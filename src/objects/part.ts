"use strict"
import { SongObject } from './song'
import { Part } from '../data/part'

export class PartObject extends Parse.Object implements Part {

  constructor(options?: any) {
    super("Part", options)
  }

  static findBySong(songId: any) {
    const query = new Parse.Query(PartObject)
    query.equalTo("song", songId)
    return query.find()
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
