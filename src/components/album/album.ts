"use strict"
import component = require('vue-class-component')

interface Params {
  year: string
  month: string
}

@component
export class Album {
  static template = "<div>album: {{$route.params.year}}年{{$route.params.month}}月号</div>"

  $route: VueRouter.$route<Params, any>
}
