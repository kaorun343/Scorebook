"use strict";

var date = new Date

export class Song {
  title: string = ""
  star: boolean = false
  year: number = date.getFullYear()
  month: number = date.getMonth() + 1
}
