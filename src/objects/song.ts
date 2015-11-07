"use strict";
import { Song } from '../data/song'
import { PartObject } from './part'
import { VideoObject } from './video'

export class SongObject extends Parse.Object implements Song {

  static get(id: string) {
    const query = new Parse.Query(SongObject)
    return query.get(id)
  }

  static findByAlbum(year: number, month: number) {
    const query = new Parse.Query(SongObject)
    query.equalTo("year", year)
    query.equalTo("month", month)
    return query.find<SongObject[]>()
  }

  static findByContext(context: any) {
    const query = new Parse.Query(SongObject)
    query.matches("title", new RegExp(context.title), null)
    return query.find<SongObject[]>()
  }

  constructor(options?: any) {
    super("Song", options)
  }

  get year(): number {
    return this.get("year")
  }

  set year(value: number) {
    this.set("year", value)
  }

  get month(): number {
    return this.get("month")
  }

  set month(value: number) {
    this.set("month", value)
  }

  get page(): number {
    return this.get("page")
  }

  set page(value: number) {
    this.set("page", value)
  }

  get title(): string {
    return this.get("title")
  }

  set title(value: string) {
    this.set("title", value)
  }

  get artist(): string {
    return this.get("artist")
  }

  set artist(value: string) {
    this.set("artist", value)
  }

  get lead(): string {
    return this.get("lead")
  }

  set lead(value: string) {
    this.set("lead", value)
  }

  get grade(): string {
    return this.get("grade")
  }

  set grade(value: string) {
    this.set("grade", value)
  }

  get type(): string {
    return this.get("type")
  }

  set type(value: string) {
    this.set("type", value)
  }

  get people(): number {
    return this.get("people")
  }

  set people(value: number) {
    this.set("people", value)
  }
}
