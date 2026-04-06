import { defineStore } from "pinia";
import mockMusic from './mockMusic.json'

// TODO: Нужно разбить на файлы, добавить типитзацию
export const music = defineStore('music', {
    state: () => ({
        musicList: [],
        activeMusic: null,
        onEnded: false
    }),
    getters: {
        // TODO: Вот тут названия норм, в целом все понятно.
        getMusicList(state) {
            return state.musicList
        },
        getActiveMusic(state) {
            return state.activeMusic
        },
      // TODO: Что такое getRepeatMusic? Судя по названию мы должны получить музыку которая повторяется..
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