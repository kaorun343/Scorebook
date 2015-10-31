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

  year: number = (new Date).getFullYear()

  static route = {
    data: function(transition: VueRouter.Transition<App, any, any, Params, any>) {
      var { year } = transition.to.params
      setTimeout(() => {
        transition.next({
          year: Number(year)
        })
      }, 0)
    }
  }
}
