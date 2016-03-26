'use strict';
import Vue = require('vue');
import VueRouter = require('vue-router');
import App from './components/app/app';
import { configureRouter } from './route-config';
require('./style.scss');

Vue.use(VueRouter);

const router = new VueRouter<App>();
configureRouter(router);

router.start(App, '#app');
