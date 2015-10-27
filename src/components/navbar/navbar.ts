"use strict"
import component = require('vue-class-component')

@component
export class Navbar {
  static template = require('./navbar.html')

  public active: string = "/"

}
