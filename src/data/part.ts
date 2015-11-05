"use strict"

export class Part {
  type: string
  keyboards: string[]

  constructor() {
    this.type = ""
    this.keyboards = ["上鍵盤", "下鍵盤", "ペダル鍵盤", "リズム"]
  }
}
