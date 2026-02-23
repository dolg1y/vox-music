import {defineStore} from "pinia";

import mockMusic from "@/store/pinia/music/mockMusic.json"

console.log(mockMusic)
console.log('test')

export const music = defineStore('music', {
    state: () => ({
        count: 0,
        musicList: mockMusic as Object
    }),
    getters: {
        getMusicList(state) {
            return state.musicList
        },
    },
})