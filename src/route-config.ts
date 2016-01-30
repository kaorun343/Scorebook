'use strict';
import { App } from './app';
import { Song } from './components/song/song';
import { Top } from './components/top/top';

export function configureRouter(router: VueRouter.Router<App>) {
    router.map({
        '/': {
            name: 'top',
            component: Top
        },
        '/song/:id': {
            name: 'song',
            component: Song
        }
    });
}
