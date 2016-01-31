'use strict';
import VueComponent = require('vue-class-component');
import {Song} from '../../store/state';

@VueComponent({
    props: ['song'],
    template: require('./cell.html')
})
export class Cell {
  song: Song;

  clicked() {
    //
  }
}
