"use strict"
import component = require('vue-class-component')
import { watch } from '../../decorators/decorators'
import { grades, types } from '../../constants/constants'
import { App } from '../../app'
import { Song } from '../../data/song'
import { Part } from '../../data/part'
import { Video } from '../../data/video'

interface Query {
  year: number
  month: number
}

@component
export class Create {
  static template = require('./create.html')

  $nextTick: Function

  song: Song
  videos: Video[]
  parts: Part[]

  private grades: string[]
  private types: string[]

  private enableRemovePart: boolean
  private isVideoEmpty: boolean

  private data() {
    return {
      song: new Song,
      parts: [new Part],
      videos: [new Video],
      enableRemovePart: false,
      isVideoEmpty: false
    }
  }

  static route = {
    data: function(transition: VueRouter.Transition<App, any, any, any, Query>) {
      var { query: {year, month} } = transition.to
      setTimeout((date: Date) => {
        transition.next({
          'song.year': year || date.getFullYear(),
          'song.month': month || date.getMonth() + 1
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
    console.log(this)
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
