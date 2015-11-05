"use strict"
import { grades, types } from '../constants/constants'

export class Song {
  title: string
  lead: string
  artist: string
  year: number
  month: number
  page: number
  type: string
  grade: string
  people: number

  constructor() {
    this.title = ""
    this.lead = ""
    this.artist = ""

    const date = new Date
    this.year = date.getFullYear()
    this.month = date.getMonth()

    this.page = 1
    this.type = types[0]
    this.grade = grades[0]
    this.people = 1
  }
}
