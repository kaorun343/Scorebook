"use strict";

var date = new Date

export class Song {
  title: string = ""
  star: boolean = false
  year: number = date.getFullYear()
  month: number = date.getMonth() + 1
}

export class SongStorage extends StoneSkin.IndexedDb<Song> {
  storeName = "songs"

  static memory = false

  static defaultStorage(): StoneSkin.Async<Song> {
    return this.memory ? new StoneSkin.MemoryDb : new SongStorage
  }
}
