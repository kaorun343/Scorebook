"use strict"
import component = require('vue-class-component')

@component
export class Logout {
  static template = require('./logout.html')

  static route: VueRouter.TransitionHook<any, any, any, any, any> = {
    canActivate: function(transition) {
      setTimeout(() => {
        if (Parse.User.current() !== null) {
          Parse.User.logOut()
          transition.next()
        } else {
          transition.abort()
        }
      })
    }
  }
}
