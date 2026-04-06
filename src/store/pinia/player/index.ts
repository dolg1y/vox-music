import {defineStore} from "pinia";

// TODO: Для чего тебе отдельный файл с экшенами если он не используется?)
// круто что ты разбил на файлы, но не круто что ты их не используешь(
// Нужно разбить все что тут есть на файлы, дописать типы
export const player = defineStore('player', {
    state: () => ({
        count: 0,
    }),
    getters: {
        // TODO: Название странное
        doubleCount: (state) => state.count * 2,
    },
})