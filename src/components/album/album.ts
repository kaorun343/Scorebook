"use strict"
import component = require('vue-class-component')
import { App } from '../../app'

interface Params {
  year: string
  month: string
}

@component
export class Album {
  static template = require('./album.html')

  year: number
  month: number

  private data() {
    const date = new Date
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1
    }
  }

  get href(): string {
    return `http://www.ymm.co.jp/magazine/electone/${this.year*100+this.month}.php`
  }

  get nextMonth(): number {
    return this.month === 12 ? 1 : this.month + 1
  }

  get previousMonth(): number {
    return this.month === 1 ? 12 : this.month - 1
  }

  get nextYear(): number {
    return this.month === 12 ? this.year + 1 : this.year
  }

  get previousYear(): number {
    return this.month === 1 ? this.year - 1 : this.year
  }

  static route = {
    data: function(transition: VueRouter.Transition<App, any, any, Params, any>) {
      const {year, month} = transition.to.params
      setTimeout(() => {
        transition.next({
          year: Number(year),
          month: Number(month)
        })
      }, 0)
    }
  }
}
