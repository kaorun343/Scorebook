"use strict";
import redux = require('redux')
const { createStore } = redux
import {scorebookApp} from '../reducers/index'
import * as actions from '../actions/index'

const reduxMixinsCreator = require('vue-redux')

export let store = createStore(scorebookApp)
export const reduxMixin = reduxMixinsCreator(actions)
