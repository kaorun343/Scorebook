"use strict"
import component = require('vue-class-component')

@component
export class Login {
  static template = require('./login.html')

  username: string
  password: string

  data() {
    return {
      username: "",
      password: ""
    }
  }

  submit() {
    Parse.User.logIn(this.username, this.password)
  }

  static route = {
    canActivate: function(transition: any) {
      return new Promise(function(resolve, reject) {
        if (!Parse.User.current()) {
          resolve()
        } else {
          reject()
        }
      })
    }
  }
}
