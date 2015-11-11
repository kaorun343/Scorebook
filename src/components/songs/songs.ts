"use strict"
import component = require('vue-class-component')
import _ = require('underscore')
import { Song } from '../../data/song'
import { SongObject } from '../../objects/song'

interface Query {
  title: string
  year: string
  month: string
}

@component
export class Songs {
  static template = require('./songs.html')

  $route: VueRouter.$route<any, any, Query>

  title: string
  songs: Song[]

  data(): any {
    return {
      title: "",
      songs: []
    }
  }

  static route = {
    data: function(transition: VueRouter.Transition<any, any, any, any, Query>) {
      const { query } = transition.to
      if (query.title) {
        return SongObject.findByQuery(query).then((songs) => {
          return ({
            title: query.title,
            songs: songs.map(({id, attributes}) => _.assign({id}, attributes))
          })
        })
      } else {
        transition.next({
          title: "",
          songs: []
        })
      }
    }
  }

  search() {
    if (this.title) {
      this.$route.router.go({name: "songs", query: {title: this.title}})
    } else {
      this.$route.router.go({path: "/songs"})
    }
  }
}
