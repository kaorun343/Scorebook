'use strict';
import component = require('vue-class-component');

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

    $route: VueRouter.$route<any, any, any>;

    submit() {
        Parse.User.logIn<Parse.User>(this.username, this.password).then((user) => {
            this.$route.router.go('/');
        });
    }

    static route: VueRouter.TransitionHook<any, any, any, any, any> = {
        canActivate: function(transition) {
            setTimeout(() => {
                if (Parse.User.current() === null) {
                    transition.next();
                } else {
                    transition.abort();
                }
            }, 0);
        }
    };
}
