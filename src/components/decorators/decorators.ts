/**
 * decorator of an event
 * @param  {string}            eventName [description]
 * @return {PropertyDecorator}           [description]
 */
export function event(eventName: string): PropertyDecorator {
  return function(target: any, propertyKey: string) {
    (target.constructor.events || (target.constructor.events = {}))[eventName] = propertyKey
  }
}

interface PropOption {
  type?: any
  required?: boolean
  default?: any
  twoWay?: boolean
  validator?: (value: any) => boolean
}

/**
 * decorator of a prop
 * @param  {PropOption}        options [description]
 * @return {PropertyDecorator}         [description]
 */
export function prop(options: PropOption): PropertyDecorator {
  return function(target: any, propertyKey: string) {
    (target.constructor.props || (target.constructor.props = {}))[propertyKey] = options
  }
}

/**
 * decorator of a watch function
 * @param  {Function}          onChange [description]
 * @return {PropertyDecorator}          [description]
 */
export function watch<T>(onChange: (value: T, oldValue: T) => void): PropertyDecorator {
  return function(target: any, propertyKey: string) {
    (target.constructor.watch || (target.constructor.watch = {}))[propertyKey] = onChange
  }
}

/**
 * decorator of a component
 * @param  {string}         componentName [description]
 * @param  {any}            Component     [description]
 * @return {ClassDecorator}               [description]
 */
export function Component(componentName: string, Component: any): ClassDecorator {
  return function(Target: any) {
    (Target.components || (Target.components = {}))[componentName] = Component
  }
}

/**
 * decorator of a filter
 * @param  {string}         filterName [description]
 * @param  {any}            filter     [description]
 * @return {ClassDecorator}            [description]
 */
export function Filter(filterName: string, filter: any): ClassDecorator {
 return function(Target: any) {
   (Target.filters || (Target.filters = {}))[filterName] = filter
 }
}


/**
 * decorator of a mixin
 * @param  {any}            Mixin [description]
 * @return {ClassDecorator}       [description]
 */
export function Mixin(Mixin: any): ClassDecorator {
  return function(Target: {mixins: any[]}) {
    if (!Target.mixins) {
      Target.mixins = []
    }
    Target.mixins.push(Mixin)
  }
}

/**
 * decorator of a partial
 * @param  {string}         partialName [description]
 * @param  {string}         partial     [description]
 * @return {ClassDecorator}             [description]
 */
export function Partial(partialName: string, partial: string): ClassDecorator {
  return function(Target: any) {
    (Target.partials || (Target.partials = {}))[partialName] = partial
  }
}
