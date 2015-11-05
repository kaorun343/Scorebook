"use strict"
import component = require('vue-class-component')
import { SongObject } from '../../objects/song'
import { PartObject } from '../../objects/part'
import { VideoObject } from '../../objects/video'
import { Song as SongData } from '../../data/song'
import { Part as PartData } from '../../data/part'
import { Video as VideoData } from '../../data/video'

interface Params {
  id: string
}

@component
export class Song {
  static template = require('./song.html')

  song: SongData
  parts: PartData[]
  videos: VideoData[]

  previousPath: string

  private data(): {
    song: SongData
    parts: PartData[]
    videos: VideoData[]
    previousPath: string
  } {
    return {
      song: new SongData,
      parts: [],
      videos: [],
      previousPath: ""
    }
  }

  $els: {
    twitter: HTMLElement
  }

  ready() {
    twttr.widgets.createShareButton(location.href, this.$els.twitter, {
      text: `私は「${this.song.title}」が弾きたいです`,
      size: "large",
      lang: "ja"
    })
  }

  static route = {
    data: function(transition: VueRouter.Transition<any, any, any, Params, any>) {
      // var { id } = transition.to.params
      // return SongObject.get(id)
      // .then((song: SongObject) => {
      //   return Promise.all<Parse.Object>([
      //     song,
      //     song.parts(),
      //     song.videos()
      //   ])
      // }).then(([song, parts, videos]: [SongObject, PartObject, VideoObject]) => ({
      //   song, parts, videos
      // }))
      setTimeout(() => {
        transition.next({
          previousPath: transition.from.path,
          'song.title': '曲名',
          'song.lead': '説明文',
          'song.artist': 'アーティスト',
          'song.year': 2015,
          'song.month': 10,
          'song.page': 50,
          'song.type': 'アンサンブルスコア',
          'song.grade': '中級'
        })
      }, 0)
    }
  }
}
