declare namespace VueClassComponent {
  var decorator: (target: any) => any
}

declare module 'vue-class-component' {
  import decorator = VueClassComponent.decorator
  export = decorator
}
