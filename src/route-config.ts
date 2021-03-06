'use strict';
import App from './components/app/app';
import Song from './components/song/song';
import Top from './components/top/top';
import Create from './components/song/create';

export function configureRouter(router: vuejs.Router<App>) {
    router.map({
        '/': {
            name: 'top',
            component: Top
        },
        '/song/:id': {
            name: 'song',
            component: Song
        },
        '/create': {
            name: 'create',
            component: Create
        }
    });
}
