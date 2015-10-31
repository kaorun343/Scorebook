"use strict"
import { SongObject } from './song'

export class VideoObject extends Parse.Object {

  constructor(options?: any) {
    super(options)
  }

  get title(): string {
    return this.get("title")
  }

  set title(value: string) {
    this.set("title", value)
  }

  get videoId(): string {
    return this.get("videoId")
  }

  set videoId(value: string) {
    this.set("videoId", value)
  }

  get song(): SongObject {
    return this.get("song")
  }

  set song(value: SongObject) {
    this.set("song", value)
  }
}
