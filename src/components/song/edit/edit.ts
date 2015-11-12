"use strict"
import _ = require('underscore')
import component = require('vue-class-component')
import { watch } from '../../../decorators/decorators'
import { grades, types } from '../../../constants/constants'
import { App } from '../../../app'
import { Song, SongWithId } from '../../../data/song'
import { Part, PartWithId } from '../../../data/part'
import { Video, VideoWidId } from '../../../data/video'
import { SongObject } from '../../../objects/song'
import { PartObject } from '../../../objects/part'
import { VideoObject } from '../../../objects/video'
import { SongForm } from '../form/song'

interface Params {
  id: string
}

@component
export class Edit implements SongForm {
  static template = require('../form/song.html')

  title: string
  id: string
  song: SongWithId
  parts: PartWithId[]
  videos: VideoWidId[]

  grades: string[]
  types: string[]
  enableRemovePart: boolean
  isVideoEmpty: boolean
  enableSubmitButton: boolean

  destroyedParts: string[]
  destroyedVideos: string[]

  data(): any {
    return {
      title: "曲の情報を編集",
      song: new Song,
      parts: [],
      videos: [],

      grades,
      types,
      enableRemovePart: false,
      isVideoEmpty: false,
      enableSubmitButton: true,

      destroyedParts: [],
      destroyedVideos: []
    }
  }

  static route = {
    data: function(transition: VueRouter.Transition<any, any, any, Params, any>) {
      const { id } = transition.to.params
      return SongObject.get(id).then((song: SongObject) => {
        return Promise.all(<any>[song, PartObject.findBySong(song), VideoObject.findBySong(song)])
      }).then(([song, parts, videos]: [SongObject, PartObject[], VideoObject[]]) => {
        return {
          song: _.assign({id: song.id}, song.attributes),
          parts: parts.map(({id, attributes}: PartObject) => _.assign({id}, attributes)),
          videos: videos.map(({id, attributes}: VideoObject) => _.assign({id}, attributes)),
          enableRemovePart: parts.length > 1
        }
      })
    }
  }

  submit() {
    if ( !this.enableSubmitButton ) {
      return
    }
    this.enableSubmitButton = false
    SongObject.update(this.song.id, this.song, this.parts.length).then((song) => {
      console.info(song)
      return Promise.all(<Parse.IPromise<Parse.Object>[]>[
        ...PartObject.update(this.parts, song),
        ...VideoObject.update(this.videos, song)
      ])
    }).then((objects: any) => {
      console.info(objects)
      return Promise.all(<Parse.IPromise<Parse.Object>[]>[
        ...PartObject.destroy(this.destroyedParts),
        ...VideoObject.destroy(this.destroyedVideos)
      ])
    }).then((objects: any) => {
      console.info(objects)
      this.destroyedVideos = []
      this.destroyedParts = []
      this.enableSubmitButton = true
    }, (err: any) => {console.error(err)})
  }

  removePart(part: PartWithId) {
    if (part.id) {
      this.destroyedParts.push(part.id)
    }
    this.parts.$remove(part)
    if (this.parts.length === 1) {
      this.enableRemovePart = false
    }
  }

  addPart() {
    this.parts.push({type: "エレクトーン", keyboards: ["上鍵盤", "下鍵盤", "ペダル鍵盤"]})
    this.enableRemovePart = true
  }

  removeVideo(video: VideoWidId) {
    if (video.id) {
      this.destroyedVideos.push(video.id)
    }
    this.videos.$remove(video)
    if (this.videos.length === 0) {
      this.isVideoEmpty = true
    }
  }

  addVideo() {
    this.videos.push({title: "", url: ""})
    if (this.isVideoEmpty) {
      this.isVideoEmpty = false
    }
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
