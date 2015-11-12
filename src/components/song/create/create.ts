"use strict"
import component = require('vue-class-component')
import { watch } from '../../../decorators/decorators'
import { grades, types } from '../../../constants/constants'
import { App } from '../../../app'
import { Song } from '../../../data/song'
import { Part } from '../../../data/part'
import { Video } from '../../../data/video'
import { SongObject } from '../../../objects/song'
import { PartObject } from '../../../objects/part'
import { VideoObject } from '../../../objects/video'
import { SongForm } from '../form/song'

interface Query {
  year: string
  month: string
}

@component
export class Create implements SongForm {
  static template = require('../form/song.html')

  title: string
  song: Song
  videos: Video[]
  parts: Part[]

  grades: string[]
  types: string[]

  enableRemovePart: boolean
  isVideoEmpty: boolean
  enableSubmitButton: boolean

  data(): any {
    return {
      title: "新規作成",
      song: new Song,
      parts: [new Part],
      videos: [],
      grades,
      types,
      enableRemovePart: false,
      isVideoEmpty: true,
      enableSubmitButton: true
    }
  }

  static route = {
    data: function(transition: VueRouter.Transition<App, any, any, any, Query>) {
      const { query: {year, month} } = transition.to
      setTimeout((date: Date) => {
        transition.next({
          'song.year': Number(year) || date.getFullYear(),
          'song.month': Number(month) || date.getMonth() + 1
        })
      }, 0, new Date)
    }
  }

  addPart() {
    this.parts.push({type: "", keyboards: ["上鍵盤", "下鍵盤", "ペダル鍵盤"]})
    this.enableRemovePart = true
  }

  removePart(part: Part) {
    this.parts.$remove(part)
    if (this.parts.length === 1) {
      this.enableRemovePart = false
    }
  }

  addVideo() {
    this.videos.push({title: "", url: ""})
    if (this.isVideoEmpty) {
      this.isVideoEmpty = false
    }
  }

  removeVideo(video: Video) {
    this.videos.$remove(video)
    if (this.videos.length === 0) {
      this.isVideoEmpty = true
    }
  }

  submit() {
    if (!this.enableSubmitButton) {
      return
    }
    this.enableSubmitButton = false
    const song = new SongObject(this.song)
    song.set("people", this.parts.length)
    song.save<SongObject>().then((song) => {
      return Promise.all(<any>[
        ...PartObject.save(song, this.parts),
        ...VideoObject.save(song, this.videos)
      ])
    }).then((result: any) => {
      this.enableSubmitButton = true
    })
  }

  @watch('song.year')
  private clampYear(value: number) {
    if (value < 1971) {
      this.song.year = 1971
    }
  }

  @watch('song.month')
  private clampMonth(value: number) {
    if (value > 12) {
      this.song.month = 12
    } else if (value < 1) {
      this.song.month = 1
    }
  }

  @watch('song.page')
  private clampPage(value: number) {
    if (value < 1) {
      this.song.page = 1
    }
  }
}
