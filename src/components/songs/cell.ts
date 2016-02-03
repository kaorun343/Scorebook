'use strict';
import Component from 'vue-class-component';
import {Song} from '../../store/state';

@Component({
    props: ['song'],
    template: require('./cell.html')
})
export default class Cell {
  song: Song;

  clicked() {
    //
  }
}
