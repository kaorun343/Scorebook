'use strict';
import { App } from './app';
import { Song } from './components/song/song';

export function configureRouter(router: VueRouter.Router<App>) {
    router.map({
        '/': {
            component: { template: '<div>top page</div>' }
        },
        '/song/:id': {
            name: 'song',
            component: Song
        }
    });
}
