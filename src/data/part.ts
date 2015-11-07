"use strict"

export class Part {
  id: string
  type: string
  keyboards: string[]

  constructor() {
    this.type = "エレクトーン"
    this.keyboards = ["上鍵盤", "下鍵盤", "ペダル鍵盤", "リズム"]
  }
}
