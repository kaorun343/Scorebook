'use strict';
import { App } from './app';
import { Album } from './components/album/album';
import { Albums } from './components/albums/albums';
import { Create } from './components/song/create/create';
import { Edit } from './components/song/edit/edit';
import { Song } from './components/song/song';
import { Songs } from './components/songs/songs';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Logout } from './components/logout/logout';

export function configureRouter(router: VueRouter.Router<App>) {
    router.map({
        '/': {
            component: { template: '<div>top page</div>' }
        },
        '/albums/:year': {
            name: 'albums',
            component: Albums
        },
        '/albums/:year/:month': {
            name: 'album',
            component: Album
        },
        '/create': {
            name: 'create',
            component: Create
        },
        '/songs': {
            name: 'songs',
            component: Songs
        },
        '/songs/:id': {
            name: 'song',
            component: Song
        },
        '/songs/:id/edit': {
            name: 'edit',
            component: Edit
        },
        '/login': {
            name: 'login',
            component: Login
        },
        '/register': {
            name: 'register',
            component: Register
        },
        '/logout': {
            name: 'logout',
            component: Logout
        },
        '/settings': {
            component: { template: '<div>settings</div>' }
        }
    });

    const year = (new Date()).getFullYear();

    router.redirect({
        '/albums': `/albums/${year}`
    });

    router.afterEach((transition) => {
        router.app.active = transition.to.path.split('/')[1];
    });
}
