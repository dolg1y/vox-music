import { defineStore } from "pinia";
import mockMusic from './mockMusic.json'

export const music = defineStore('music', {
    state: () => ({
        musicList: [],
        activeMusic: null,
        onEnded: false
    }),
    getters: {
        getMusicList(state) {
            return state.musicList
        },
        getActiveMusic(state) {
            return state.activeMusic
        },
        getRepeatMusic(state) {
            return state.onEnded
        }
    },
    actions: {
        fetchDataMusic() {
            this.musicList = mockMusic.map((musicItem: Object) => { return musicItem })
        },
        setActiveMusic(id: number) {
            this.activeMusic = this.musicList[id]
        },
        setRepeatMusic() {
            this.onEnded = !this.onEnded
        }
    }
})