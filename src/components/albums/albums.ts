'use strict';
import Component from 'vue-class-component';
import { Data } from 'vue-property-decorator';
import App from '../../app';
import { Pagination } from './pagination';

interface Params {
    year: string;
}

@Component({})
@Data(() => ({ year: (new Date().getFullYear()) }))
export class Albums {
    static template = require('./albums.html');
    static components = { Pagination };

    year: number;

    static route: VueRouter.TransitionHook<App, any, any, Params, any> = {
        data: function(transition) {
            const { year } = transition.to.params;
            setTimeout(() => {
                transition.next({
                    year: Number(year)
                });
            }, 0);
        }
    };
}
