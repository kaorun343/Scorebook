'use strict';
import VueComponent = require('vue-class-component');
import { Data, prop } from 'vue-property-decorator';

@VueComponent
@Data(() => ({}))
export class Cell {
  static template = require('./cell.html');

  @prop(String)
  title: string;

  @prop(String)
  artist: string;

  @prop(String)
  lead: string;

  clicked() {
    //
  }
}
