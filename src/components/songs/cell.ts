'use strict';
import VueComponent = require('vue-class-component');
import {prop} from 'vue-property-decorator';
import {Song} from '../../store/state';

@VueComponent({
    template: require('./cell.html')
})
export class Cell {
  @prop(Object)
  song: Song;

  clicked() {
    //
  }
}
