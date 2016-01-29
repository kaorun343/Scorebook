'use strict';
import component = require('vue-class-component');
import { App } from '../../app';

@component
export class Logout {
    static template = require('./logout.html');

    static route: VueRouter.TransitionHook<App, any, any, any, any> = {
        canActivate: function(transition) {
            setTimeout(() => {
                if (transition.to.router.app.auth) {
                    // Parse.User.logOut();
                    transition.next();
                } else {
                    transition.abort();
                }
            });
        }
    };
}
