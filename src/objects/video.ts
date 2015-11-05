"use strict"
import { SongObject } from './song'
import { Video } from '../data/video'

export class VideoObject extends Parse.Object implements Video {

  constructor(options?: any) {
    super("Video", options)
  }

  static findBySong(songId: any) {
    const query = new Parse.Query(VideoObject)
    query.equalTo("song", songId)
    return query.find()
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
