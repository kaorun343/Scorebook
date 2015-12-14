"use strict"
import component = require('vue-class-component')

@component
export class Register {
  static template = require('./register.html')

  username: string
  email: string
  password: string
  password_confirm: string

  canSubmit: boolean

  $route: VueRouter.$route<any, any, any>

  data() {
    return {
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      canSubmit: true
    }
  }

  get isValidPassword(): boolean {
    return this.password === this.password_confirm
  }

  submit() {
    if ( !this.canSubmit ) {
      return
    }
    this.canSubmit = false
    const user = new Parse.User()
    user.setUsername(this.username)
    user.setEmail(this.email, {})
    user.setPassword(this.password)
    user.signUp<Parse.User>(null).then(u => {
      this.$route.router.go({name: "login"})
    }, error => {
      console.warn(error)
      this.canSubmit = true
    })
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
