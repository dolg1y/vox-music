interface activeMusic {
    id: number,
    name: string,
    url: string
}

interface State {
    musicList: activeMusic[]
    activeMusic: activeMusic | null
    onEnded: boolean,
    audio: HTMLAudioElement
}

const state = (): State => ({
    musicList: [],
    activeMusic: null,
    onEnded: false,
    audio: new Audio()
})

export default state
