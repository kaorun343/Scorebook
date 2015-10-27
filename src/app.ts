import Vue = require('vue')
import component = require('vue-class-component')
import VueRouter = require('vue-router')
import { configureRouter } from './route-config'
import { Navbar } from './components/navbar/navbar'

// Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY)

Vue.use(VueRouter)

const router = new VueRouter()
configureRouter(router)

@component
class App {
  static template = require('./app.html')
  static components = { Navbar }

  active = ""

  $refs: {
    navbar: Navbar
  }
}

router.afterEach((transition) => {
  var path = transition.to.path.split("/")[1]
  var app = <App>router.app
  app.$refs.navbar.active = path
})
router.start(App, '#app')
