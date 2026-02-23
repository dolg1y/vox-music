import {defineStore} from "pinia";

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
    }),
    actions: {
        // поскольку мы опираемся на `this`, мы не можем использовать стрелочную функцию
        increment() {
            this.count++
        },
        randomizeCounter() {
            this.count = Math.round(100 * Math.random())
        },
    },
})