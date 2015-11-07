"use strict"
import { App } from './app'
import { Album } from './components/album/album'
import { Albums } from './components/albums/albums'
import { Create } from './components/create/create'
import { Edit } from './components/edit/edit'
import { Song } from './components/song/song'

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
      component: { template: "<div>songs and search bar</div>" }
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
