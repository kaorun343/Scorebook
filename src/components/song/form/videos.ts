"use strict"
import component = require('vue-class-component')
import { prop, watch } from '../../../decorators/decorators'
import { Video, VideoWidId } from '../../../data/video'

@component
export class VideosForm {
  static template = require('./videos.html')

  toBeDestroyed: string[]
  isEmpty: boolean

  data(): any {
    return {
      toBeDestroyed: [],
      isEmpty: true
    }
  }

  @prop({type: Array, default: () => (<VideoWidId[]>[])})
  videos: VideoWidId[]

  add() {
    this.videos.push({title: "", url: ""})
    if ( this.isEmpty ) {
      this.isEmpty = false
    }
  }

  remove(video: VideoWidId) {
    if ( video.id ) {
      this.toBeDestroyed.push(video.id)
    }
    this.videos.$remove(video)
    if ( this.videos.length == 0 ) {
      this.isEmpty = true
    }
  }

  @watch("isEmpty")
  onchange(value: boolean) {
    console.log(value)
  }
}
