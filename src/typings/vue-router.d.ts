declare namespace VueRouter {

  interface Transition {
    from: $route<any, any>
    to: $route<any, any>
    next(data?: any): void
    abort(reason?: any): void
    redirect(path: string): void
  }

  interface RouterOption {
    hashbang?: boolean
    history?: boolean
    abstract?: boolean
    root?: string
    linkActiveClass?: string
    saveScrollPosition?: boolean
    transitionOnLoad?: boolean
    suppressTransitionError?: boolean
  }

  interface RouterStatic {
    new(option?: RouterOption): Router
  }

  interface Router {

    app: any
    mode: string

    start(App: Function | Object, el: string | Element): void
    stop(): void
    map(routeMap: Object): void
    on(path: string, config: Object): void
    go(path: string | Object): void
    replace(path: string): void
    redirect(redirectMap: Object): void
    alias(aliasMap: Object): void
    beforeEach(hook: (transition: Transition) => Promise<any> | any): void
    afterEach(hook: (transition: Transition) => Promise<any> | any): void
  }

  interface $route<Params, Query> {
    path: string
    params: Params
    query: Query
    router: Router
  }
}

declare module "vue-router" {
  var static: VueRouter.RouterStatic
  export = static
}
