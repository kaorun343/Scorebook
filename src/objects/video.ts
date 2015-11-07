"use strict"
import { SongObject } from './song'
import { Video } from '../data/video'

export class VideoObject extends Parse.Object implements Video {

  static get(id: string): Parse.Promise<VideoObject> {
    const query = new Parse.Query(this)
    return query.get(id)
  }

  static findBySong(song: SongObject): Parse.Promise<VideoObject[]> {
    const query = new Parse.Query(this)
    query.equalTo("song", song)
    return query.find()
  }

  constructor(options?: any) {
    super("Video", options)
  }

  get title(): string {
    return this.get("title")
  }

  set title(value: string) {
    this.set("title", value)
  }

  get url(): string {
    return this.get("url")
  }

  set url(value: string) {
    this.set("url", value)
  }

  get song(): SongObject {
    return this.get("song")
  }

  set song(value: SongObject) {
    this.set("song", value)
  }
}
