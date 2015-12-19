'use strict';
import component = require('vue-class-component');
import { Navbar } from './components/navbar/navbar';


@component
export class App {
  static template = require('./app.html');
  static components = { Navbar };

  active: string;
  auth: boolean;

  protected data() {
    return {
      active: '',
      auth: false
    };
  }
}
