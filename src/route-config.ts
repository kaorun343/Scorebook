"use strict"
import { App } from './app'
import { Album } from './components/album/album'
import { Albums } from './components/albums/albums'
import { Create } from './components/create/create'

export function configureRouter(router: VueRouter.Router) {
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
      component: Create
    },
    "/songs": {
      component: { template: "<div>songs and search bar</div>" }
    },
    "/songs/:id": {
      component: { template: "<div>a song</div>" }
    },
    "/settings": {
      component: { template: "<div>settings</div>" }
    }
  })

  router.redirect({
    "/albums": `/albums/${(new Date).getFullYear()}`
  })

  router.afterEach((transition) => {
    var path = transition.to.path.split("/")[1]
    var app = <App>router.app
    app.active = path
  })
}
