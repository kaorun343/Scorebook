'use strict';
import Vue = require('vue');
import Vuex from 'vuex';
import {Actions, actions} from './actions';
import {mutations} from './mutations';
import {State} from './state';
Vue.use(Vuex);

export default new Vuex.Store({
    state: new State(),
    mutations,
    actions: actions as any as Actions
});
