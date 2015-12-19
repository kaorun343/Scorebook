'use strict';
import component = require('vue-class-component');
import { App } from '../../app';

@component
export class Login {
    static template = require('./login.html');

    username: string;
    password: string;

    protected data() {
        return {
            username: '',
            password: ''
        };
    }

    $route: VueRouter.$route<App, any, any>;

    submit() {
        Parse.User.logIn<Parse.User>(this.username, this.password).then((user) => {
            this.$route.router.go('/');
        });
    }

    static route: VueRouter.TransitionHook<App, any, any, any, any> = {
        canActivate: function(transition) {
            return !transition.to.router.app.auth;
        }
    };
}
