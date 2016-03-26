'use strict';
import Vue = require('vue');
import {install, Store} from 'vuex';
import mutations from './mutations';
import State from './state';
Vue.use(install);

export default new Store<State>({
    state: new State(),
    mutations
});
