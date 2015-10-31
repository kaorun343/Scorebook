"use strict";
import { PartObject } from './part'
import { VideoObject } from './video'

export class SongObject extends Parse.Object {

  constructor(options?: any) {
    super(options)
  }

  parts() {
    const query = new Parse.Query(PartObject)
    query.equalTo("song", this)
    return query.find<PartObject>()
  }

  videos() {
    const query = new Parse.Query(VideoObject)
    query.equalTo("song", this)
    return query.find<VideoObject>()
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

  get star(): boolean {
    return this.get("star")
  }

  set star(value: boolean) {
    this.set("star", value)
  }
}
