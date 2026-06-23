import mockMusic from '../mockMusic.json'

const actions = {
    fetchDataMusic() {
        this.musicList = mockMusic.map((musicItem: Object) => { return musicItem })
    },
    setActiveMusic(id: number, url: string) {
        this.activeMusic = this.musicList[id]
        this.audio.src = url

        console.log(this.activeMusic)
    },
    setRepeatMusic() {
        this.onEnded = !this.onEnded
    },
}

export default actions
