"use strict"
import Vue = require('vue')
const _ = Vue.util
import component = require('vue-class-component')
import { Song, SongWithId } from '../../../data/song'
import { Part, PartWithId } from '../../../data/part'
import { Video, VideoWidId } from '../../../data/video'
import { SongObject } from '../../../objects/song'
import { PartObject } from '../../../objects/part'
import { VideoObject } from '../../../objects/video'
import { SongForm } from '../form/song'
import { PartsForm } from '../form/parts'
import { VideosForm } from '../form/videos'


interface Params {
  id: string
}

@component
export class Edit {
  static template = require('./edit.html')
  static components = { SongForm, PartsForm, VideosForm }

  song: SongWithId
  parts: PartWithId[]
  videos: VideoWidId[]

  enableSubmitButton: boolean

  data(): any {
    return {
      song: new Song,
      parts: [],
      videos: [],
      enableSubmitButton: true
    }
  }

  $refs: {
    song: SongForm
    parts: PartsForm
    videos: VideosForm
  }

  $route: VueRouter.$route<any, any, any>

  static route = {
    data: function(transition: VueRouter.Transition<any, any, any, Params, any>) {
      const { id } = transition.to.params
      return SongObject.get(id).then((song: SongObject) => {
        return Promise.all(<any>[song, PartObject.findBySong(song), VideoObject.findBySong(song)])
      }).then(([song, parts, videos]: [SongObject, PartObject[], VideoObject[]]) => {
        var self: Edit = this
        self.$refs.videos.isEmpty = videos.length === 0
        self.$refs.parts.isRemovable = parts.length > 1
        return {
          song: _.extend({id: song.id}, song.attributes),
          parts: parts.map(({id, attributes}: PartObject) => _.extend({id}, attributes)),
          videos: videos.map(({id, attributes}: VideoObject) => _.extend({id}, attributes))
        }
      })
    }
  }

  submit() {
    if ( !this.enableSubmitButton ) {
      return
    }
    this.enableSubmitButton = false
    const { song, parts, videos } = this.$refs
    SongObject.update(song.song.id, song.song, parts.parts.length).then((song) => {
      return Promise.all(<Parse.IPromise<Parse.Object>[]>[
        ...PartObject.update(parts.parts, song),
        ...VideoObject.update(videos.videos, song)
      ])
    }).then((objects: any) => {
      console.info(objects)
      return Promise.all(<Parse.IPromise<Parse.Object>[]>[
        ...PartObject.destroy(parts.toBeDestroyed),
        ...VideoObject.destroy(videos.toBeDestroyed)
      ])
    }).then((objects: any) => {
      this.$route.router.go({name: "song", params: {id: this.song.id}})
    }, (err: any) => {console.error(err)})
  }
}
