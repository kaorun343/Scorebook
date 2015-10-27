import Vue = require('vue')
import component = require('vue-class-component')

// Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY)

@component
class App {
  static el = '#app'
}

const app = new App()
