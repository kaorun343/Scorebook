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

  text: string
  songs: Song[]

  data(): any {
    return {
      text: "",
      songs: []
    }
  }

  static route = {
    data: function(transition: VueRouter.Transition<any, any, any, any, Query>) {
      const { query } = transition.to
      if (query.title) {
        return SongObject.findByContext(query).then((songs) => {
          return ({
            songs: songs.map(({id, attributes}) => _.assign({id}, attributes)),
            text: query.title
          })
        })
      } else {
        transition.next({
          text: "",
          songs: []
        })
      }
    }
  }

  search() {
    if (this.text) {
      this.$route.router.go({name: "songs", query: {title: this.text}})
    } else {
      this.$route.router.go({path: "/songs"})
    }
  }
}
