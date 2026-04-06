<script setup>
import { music } from "@/store/pinia/music/index.js";
import {computed, ref, watch} from "vue";

defineProps({
  music: Object,
})

const isPlaying = ref(false)

const activeMusic = music()

const nameTrack = computed(() => activeMusic.getActiveMusic?.name || 'Не указано')
const textRepeat = computed(() => {
   if(activeMusic.getRepeatMusic) {
     return 'repeat'
   } else {
     return 'no-repeat'
   }
})

const setPrevMusic = () => {
  const audioNow = document.getElementById(`track-${music().getActiveMusic.id}`)

  if (music().getActiveMusic.id <= 0) {
    audioNow.currentTime = 0
    audioNow.play()

    return
  }

  const audioPrev = document.getElementById(`track-${music().getActiveMusic.id - 1}`)
  audioNow.pause()
  audioNow.currentTime = 0
  audioPrev.play()

  music().setActiveMusic(music().getActiveMusic.id - 1)
  changeVolume()
}

const setPlayPauseMusic = () => {
  const audio = document.getElementById(`track-${music().getActiveMusic.id}`)

  if(!isPlaying.value) {
    audio?.pause()
    isPlaying.value = true
    console.log(audio)

    return
  }

  audio?.play()
  isPlaying.value = false
  changeVolume()
}

const setNextMusic = () => {
  const audioNow = document.getElementById(`track-${music().getActiveMusic.id}`)

  if (music().getActiveMusic.id + 1 >= music().getMusicList.length) {
    music().setActiveMusic(0)
    audioNow.currentTime = 0
    audioNow.volume = 20
    audioNow.play()

    return
  }

  const audioNext = document.getElementById(`track-${music().getActiveMusic.id + 1}`)
  audioNow.pause()
  audioNow.currentTime = 0
  audioNext.play()

  music().setActiveMusic(music().getActiveMusic.id + 1)
  changeVolume()
}

const changeVolume = () => {
  const audioNow = document.getElementById(`track-${music().getActiveMusic.id}`)
  const volume = document.getElementById('volume')

  audioNow.volume = volume.value / 100
}

const repeatMusic = () => {
  activeMusic.setRepeatMusic()

  console.log(activeMusic.getRepeatMusic)
}
</script>

<template>
  <div class="play-bar" ref="playbar">
    <div class="play-bar__name">
      <img src="" alt="">
      <div class="play-bar__name-text">
        <p>{{ nameTrack }}</p>
      </div>
    </div>
    <div class="play-bar__record-player">
        <button @click="setPrevMusic()">prev</button>
        <button type="button" @click="setPlayPauseMusic()">play</button>
        <button @click="setNextMusic()">next</button>
    </div>
    <div>
      <button @click="repeatMusic">{{ textRepeat }}</button>
    </div>
    <div class="play-bar__volume">
      <input @change="changeVolume" type="range" id="volume" name="volume" value="100" min="0" max="100" />
      <label for="volume">Volume</label>
    </div>
  </div>
</template>

<style src="./styles.scss" lang="scss" />
