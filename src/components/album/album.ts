"use strict"
import _ = require('underscore')
import component = require('vue-class-component')
import { App } from '../../app'
import { SongObject } from '../../objects/song'
import { Song } from '../../data/song'

interface Params {
  year: string
  month: string
}

@component
export class Album {
  static template = require('./album.html')

  year: number
  month: number
  songs: ( Song & {id: string} )[]

  private data(): any {
    const date = new Date
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      songs: []
    }
  }

  get href(): string {
    return `http://www.ymm.co.jp/magazine/electone/${this.year*100+this.month}.php`
  }

  get nextMonth(): number {
    return this.month === 12 ? 1 : this.month + 1
  }

  get previousMonth(): number {
    return this.month === 1 ? 12 : this.month - 1
  }

  get nextYear(): number {
    return this.month === 12 ? this.year + 1 : this.year
  }

  get previousYear(): number {
    return this.month === 1 ? this.year - 1 : this.year
  }

  static route = {
    data: function(transition: VueRouter.Transition<App, any, any, Params, any>) {
      const {year, month} = transition.to.params
      const y = Number(year)
      const m = Number(month)

      return SongObject.findByAlbum(y, m).then((songs) => {
        return songs.map((song) => {
          const {attributes, id} = song
          return _.assign({id}, attributes)
        })
      }).then((songs) => ({songs, year: y, month: m}))
    }
  }
}
