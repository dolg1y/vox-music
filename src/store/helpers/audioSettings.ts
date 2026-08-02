import { music } from "@/store/pinia/music";

export const changeVolume = () => {
    const volume = document.getElementById('volume') as HTMLInputElement

    music().getAudio.volume = +volume.value / 100
}

export const repeatMusic = () => { music().setRepeatMusic() }