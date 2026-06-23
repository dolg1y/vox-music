import { defineStore } from "pinia";

import getters from './getters'
import actions from './actions'
import state from './state'

export const music = defineStore('music', {
    state,
    getters,
    actions
})