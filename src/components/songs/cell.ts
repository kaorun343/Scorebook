'use strict';
import VueComponent = require('vue-class-component');
import {prop} from 'vue-property-decorator';
import {Song} from '../../store/state';

@VueComponent
export class Cell {
  static template = require('./cell.html');

  @prop(Object)
  song: Song;

  clicked() {
    //
  }
}
