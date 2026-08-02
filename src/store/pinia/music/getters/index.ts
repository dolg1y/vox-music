const getters = {
    getMusicList(state) {
        return state.musicList
    },
    getActiveMusic(state) {
        return state.activeMusic
    },
    getAudio(state) {
        return state.audio
    },
    getButtonRepeat(state) {
        return state.onEnded
    }
}

export default getters;