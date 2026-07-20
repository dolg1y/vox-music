import { defineStore } from "pinia";

const getters = {
    getMusicList(state) {
        return state.musicList
    },
    getActiveMusic(state) {
        return state.activeMusic
    },
    getAudio(state) {
        return new Audio(state.activeMusic.url)
    }
}

export default getters;