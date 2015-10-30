interface Object {
  $set(path: string | number, value: any): any
}

interface Array<T> {
  $remove(item: T): void
}
