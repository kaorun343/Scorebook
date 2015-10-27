"use strict"
import component = require('vue-class-component')
import { prop, watch } from '../../decorators/decorators'

@component
export class Navbar {
  static template = require('./navbar.html')

  public active: string = "/"

  private $route: VueRouter.$route<any, any>
}
