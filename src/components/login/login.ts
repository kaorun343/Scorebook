'use strict';
import component = require('vue-class-component');
import { Data } from 'vue-property-decorator';
import { App } from '../../app';

@component
@Data(() => ({
    username: '',
    password: ''
}))
export class Login {
    static template = require('./login.html');

    username: string;
    password: string;

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
