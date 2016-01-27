'use strict';
import component = require('vue-class-component');
import { Data } from 'vue-property-decorator';
import { App } from '../../app';

@component
@Data(() => ({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    canSubmit: true
}))
export class Register {
    static template = require('./register.html');

    username: string;
    email: string;
    password: string;
    password_confirm: string;

    canSubmit: boolean;

    $route: VueRouter.$route<App, any, any>;

    get isValidPassword(): boolean {
        return this.password === this.password_confirm;
    }

    submit() {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        const user = new Parse.User();
        user.setUsername(this.username);
        user.setEmail(this.email, {});
        user.setPassword(this.password);
        user.signUp<Parse.User>(null).then(u => {
            this.$route.router.go({ name: 'login' });
        }, error => {
            console.warn(error);
            this.canSubmit = true;
        });
    }

    static route: VueRouter.TransitionHook<App, any, any, any, any> = {
        canActivate: function(transition) {
            return !transition.to.router.app.auth;
        }
    };
}
