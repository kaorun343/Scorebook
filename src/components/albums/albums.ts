"use strict"
import component = require('vue-class-component')
import { App } from '../../app'
import { Pagination } from './pagination'

interface Params {
  year: string
}

@component
export class Albums {
  static template = require('./albums.html')
  static components = { Pagination }

  year: number

  private data() {
    const date = new Date
    return {
      year: date.getFullYear()
    }
  }

  static route: VueRouter.TransitionHook<App, any, any, Params, any> = {
    data: function(transition) {
      var { year } = transition.to.params
      setTimeout(() => {
        transition.next({
          year: Number(year)
        })
      }, 0)
    }
  }
}
