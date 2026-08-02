<script setup lang="ts">
import { music } from "@/store/pinia/music/index.js"
import { computed, ref } from "vue"
import { changeVolume, repeatMusic } from "@/store/helpers/audioSettings";

const isPlaying = ref(false)

const NOT_FOUND_MUSIC = 'Не указано'
const REPEAT_BUTTON = 'repeat'
const NO_REPEAT_BUTTON = 'no-repeat'

const nameTrack = computed(() => music().getActiveMusic?.name || NOT_FOUND_MUSIC)
const textRepeat = computed(() => {
   if(music().getButtonRepeat) {
     return REPEAT_BUTTON
   }

  return NO_REPEAT_BUTTON
})

const prevMusic = () => {
  if (music().getActiveMusic.id <= 0) {
    music().getAudio.currentTime = 0
    music().getAudio.play()

    return
  }

  music().getAudio.pause()
  music().getAudio.currentTime = 0
  music().setActiveMusic(music().getActiveMusic.id - 1)
  music().getAudio.play()
  changeVolume()
};

const startOrPauseMusic = () => {
  if(!isPlaying.value) {
    music().getAudio.pause()
    isPlaying.value = true

    return
  }

  music().getAudio.play()
  isPlaying.value = false
  changeVolume()
}

const nextMusic = () => {
  if (music().getActiveMusic.id + 1 >= music().getMusicList.length) {
    music().setActiveMusic(0)

    return
  }

  music().getAudio.pause()
  music().getAudio.currentTime = 0
  music().setActiveMusic(music().getActiveMusic.id + 1, music().getActiveMusic.url)
  music().getAudio.play()
  changeVolume()
}
</script>

<template>
  <div class="play-bar">
    <div class="play-bar__wr">
      <div class="play-bar__name">
        <img src="" alt="">
        <div class="play-bar__name-text">
          <p>{{ nameTrack }}</p>
        </div>
      </div>
      <div class="play-bar__record-player">
        <button type="button" @click="prevMusic">prev</button>
        <button class="play-bar__play-button" type="button" @click="startOrPauseMusic">
          <img src="/play-bar-icons/play.png" alt="">
        </button>
        <button type="button" @click="nextMusic">next</button>
      </div>
      <div>
        <button @click="repeatMusic">{{ textRepeat }}</button>
      </div>
      <div class="play-bar__volume">
        <input @input="changeVolume" type="range" id="volume" name="volume" min="0" max="100" value="100" />
        <label for="volume">Volume</label>
      </div>
    </div>
  </div>
</template>

<style src="./styles.scss" lang="scss" />
