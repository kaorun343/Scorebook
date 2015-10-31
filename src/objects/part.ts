"use strict"
import { SongObject } from './song'

export class PartObject extends Parse.Object {

  constructor(options?: any) {
    super(options)
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