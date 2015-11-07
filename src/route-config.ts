"use strict"
import { App } from './app'
import { Album } from './components/album/album'
import { Albums } from './components/albums/albums'
import { Create } from './components/song/create/create'
import { Edit } from './components/song/edit/edit'
import { Song } from './components/song/song'
import { Songs } from './components/songs/songs'

export function configureRouter(router: VueRouter.Router<App>) {
  router.map({
    "/": {
      component: { template: "<div>top page</div>" }
    },
    "/albums/:year": {
      name: "albums",
      component: Albums
    },
    "/albums/:year/:month": {
      name: "album",
      component: Album
    },
    "/create": {
      name: "create",
      component: Create
    },
    "/songs": {
      name: "songs",
      component: Songs
    },
    "/songs/:id": {
      name: "song",
      component: Song
    },
    "/songs/:id/edit": {
      name: "edit",
      component: Edit
    },
    "/settings": {
      component: { template: "<div>settings</div>" }
    }
  })

  router.redirect({
    "/albums": `/albums/${(new Date).getFullYear()}`
  })

  router.afterEach((transition) => {
    router.app.active = transition.to.path.split("/")[1]
  })
}
