"use strict"
import _ = require('underscore')
import component = require('vue-class-component')
import { watch } from '../../decorators/decorators'
import { grades, types } from '../../constants/constants'
import { App } from '../../app'
import { Song } from '../../data/song'
import { Part } from '../../data/part'
import { Video } from '../../data/video'
import { SongObject } from '../../objects/song'
import { PartObject } from '../../objects/part'
import { VideoObject } from '../../objects/video'
import { SongForm } from '../../partials/form/song'

interface Params {
  id: string
}

@component
export class Edit implements SongForm {
  static template = require('../../partials/form/song.html')

  title: string
  id: string
  song: Song
  parts: Part[]
  videos: Video[]

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
    },
    canDeactivate: function(transition: VueRouter.Transition<any, any, any, Params, any>) {
      var result = confirm("編集中です。移動してもいいですか？")
      return result;
    }
  }

  submit() {
    if ( !this.enableSubmitButton ) {
      return
    }
    this.enableSubmitButton = false
    SongObject.get(this.song.id).then((song: SongObject) => {
      song.set("year", this.song.year)
      song.set("month", this.song.month)
      song.set("page", this.song.page)
      song.set("title", this.song.title)
      song.set("lead", this.song.lead)
      song.set("grade", this.song.grade)
      song.set("type", this.song.type)
      return song.save()
    }).then((song: SongObject) => {
      console.info(song)
      const parts = this.parts.map((part) => {
        if ( part.id ) {
          return PartObject.get(part.id).then((p: PartObject) => {
            p.set("type", part.type)
            p.set("keyboards", part.keyboards)
            return p.save()
          })
        } else {
          const p = new PartObject(part)
          p.set("song", song)
          return p.save()
        }
      })

      const videos = this.videos.map((video) => {
        if ( video.id ) {
          return VideoObject.get(video.id).then((v: VideoObject) => {
            v.set("title", video.title)
            v.set("url", video.url)
            return v.save()
          })
        } else {
          const v = new VideoObject(video)
          v.set("song", song)
          return v.save()
        }
      })

      return Promise.all(<Parse.IPromise<Parse.Object>[]>[...parts, ...videos])
    }).then((objects: any) => {
      console.info(objects)
      const parts = this.destroyedParts.map((partId) => {
        return PartObject.get(partId).then((part: PartObject) => {
          return part.destroy()
        })
      })

      const videos = this.destroyedVideos.map((videoId) => {
        return VideoObject.get(videoId).then((video: VideoObject) => {
          return video.destroy()
        })
      })

      return Promise.all(<Parse.IPromise<Parse.Object>[]>[...parts, ...videos])
    }).then((objects: any) => {
      console.info(objects)
      this.destroyedVideos = []
      this.destroyedParts = []
      this.enableSubmitButton = true
    }, (err: any) => {console.error(err)})
  }

  removePart(part: Part) {
    if (part.id) {
      this.destroyedParts.push(part.id)
    }
    this.parts.$remove(part)
    if (this.parts.length === 1) {
      this.enableRemovePart = false
    }
    this.updatePeople()
  }

  addPart() {
    this.parts.push({id: undefined, type: "", keyboards: ["上鍵盤", "下鍵盤", "ペダル鍵盤"]})
    this.enableRemovePart = true
    this.updatePeople()
  }

  updatePeople() {
    this.song.people = this.parts.length
  }

  removeVideo(video: Video) {
    if (video.id) {
      this.destroyedVideos.push(video.id)
    }
    this.videos.$remove(video)
    if (this.videos.length === 0) {
      this.isVideoEmpty = true
    }
  }

  addVideo() {
    this.videos.push({id: undefined, title: "", url: ""})
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
