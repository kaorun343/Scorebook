import Vue = require('vue')
import component = require('vue-class-component')
import VueRouter = require('vue-router')
import { configureRouter } from './route-config'

// Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY)

Vue.use(VueRouter)

const router = new VueRouter()
configureRouter(router)

@component
class App {
  static template = require('./app.html')
}

router.start(App, '#app')
