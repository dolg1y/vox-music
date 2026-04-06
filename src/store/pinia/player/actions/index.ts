import {defineStore} from "pinia";

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0, // TODO: Что такое count? Количество? Сумма? Не понятно(
    }),
    actions: {
        // поскольку мы опираемся на `this`, мы не можем использовать стрелочную функцию
        // TODO: Название функции странное, что мы инкриментируем? Не понятно что происходит в ней..
        increment() {
            this.count++
        },
        // TODO: Тут с названеим аналогично
        randomizeCounter() {
            this.count = Math.round(100 * Math.random())
        },
    },
})