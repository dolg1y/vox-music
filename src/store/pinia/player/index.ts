import {defineStore} from "pinia";

export const player = defineStore('player', {
    state: () => ({
        count: 0,
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
})