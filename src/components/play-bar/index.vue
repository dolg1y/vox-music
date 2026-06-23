<script setup lang="ts">
import { music } from "@/store/pinia/music/index.js"
import { computed, ref } from "vue"
import { NButton } from 'naive-ui'

const isPlaying = ref(false)
const value = ref(0)

const activeMusic = music()

const NOT_FOUND_MUSIC = 'Не указано'
const REPEAT_BUTTON = 'repeat'
const NO_REPEAT_BUTTON = 'no-repeat'

const nameTrack = computed(() => activeMusic.getActiveMusic?.name || NOT_FOUND_MUSIC)
const textRepeat = computed(() => {
   if(activeMusic.getButtonRepeat) {
     return REPEAT_BUTTON
   }

  return NO_REPEAT_BUTTON
})

const prevMusic = () => {
  if (activeMusic.getActiveMusic.id <= 0) {
    music().getActiveTrack.currentTime = 0
    music().getActiveTrack.play()

    return
  }

  music().getActiveTrack.pause()
  music().getActiveTrack.currentTime = 0
  activeMusic.setActiveMusic(activeMusic.getActiveMusic.id - 1)
  activeMusic.getActiveTrack.play()
  console.log(activeMusic.getActiveMusic)
  changeVolume()
};

const startOrPauseMusic = () => {
  const audio = document.getElementById(`track-${activeMusic.getActiveMusic.id}`)

  if(!isPlaying.value) {
    // TODO: Вот опять таки. Тут у тебя почему то есть ?. для запуска метода pause, а в дургих местах нет.
    audio?.pause()
    isPlaying.value = true

    return
  }

  audio?.play()
  isPlaying.value = false
  changeVolume()
}

const nextMusic = () => {
  console.log(music().getNextTrack)
  if (activeMusic.getActiveMusic.id + 1 >= activeMusic.getMusicList.length) {
    activeMusic.setActiveMusic(0)
    // changeAudioCurrentTimeAndPlayTrack(audioNow, audioNow)

    return
  }

  music().getActiveTrack.pause()
  // changeAudioCurrentTimeAndPlayTrack(audioNow, audioNext)
  music().setActiveMusic(activeMusic.getNextTrack.id, activeMusic.getNextTrack.url)
  changeVolume()
}

const changeVolume = () => {
  const volume = document.getElementById('volume') as HTMLInputElement

  music().getActiveTrack.volume = +volume.value / 100
}

const changeAudioCurrentTimeAndPlayTrack = (audioCurrentTime) => {
  audioCurrentTime.currentTime = 0
  music().getActiveTrack.play()
}

const repeatMusic = () => { activeMusic.setRepeatMusic() }
</script>

<template>
  <!-- TODO: ref есть. Но не используется... -->
  <div class="play-bar" ref="playbar">
    <div class="play-bar__wr">
      <div class="play-bar__name">
        <img src="" alt="">
        <div class="play-bar__name-text">
          <p>{{ nameTrack }}</p>
        </div>
      </div>
      <div class="play-bar__record-player">
        <button @click="prevMusic">prev</button>
        <button type="button" @click="startOrPauseMusic">play</button>
        <button @click="nextMusic">next</button>
      </div>
      <div>
        <button @click="repeatMusic">{{ textRepeat }}</button>
      </div>
      <!-- TODO: А чего не стал оборачивать input в label? -->
      <div class="play-bar__volume">
        <n-slider v-model:value="value" :step="10" />
      </div>
    </div>
  </div>
</template>

<style src="./styles.scss" lang="scss" />
