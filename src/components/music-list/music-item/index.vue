<script setup>

import { music } from "@/store/pinia/music/index.js";
import {ref} from "vue";

const isPlaying = ref(false)

defineProps({
  musicList: Object,
})

const onPlayMusic = (id) => {
  const audioNow = document.getElementById(`track-${music().getActiveMusic?.id}`)
  const audio = document.getElementById(`track-${id}`)

  if(!isPlaying.value) {
    audio.play()

    music().setActiveMusic(id)
    isPlaying.value = true

    return
  }

  if(id === music().getActiveMusic.id) {
    audioNow.pause()
    isPlaying.value = false

    return
  }

  audioNow.pause()
  audioNow.currentTime = 0
  audio.play()
  music().setActiveMusic(id)
  isPlaying.value = true
}

const onEndedCheck = () => {
  const audioNow = document.getElementById(`track-${music().getActiveMusic?.id}`)

  if(music().getRepeatMusic) {
    audioNow.currentTime = 0
    audioNow.play()
  }
}

</script>

<template>
  <div>
    <div
        @click="onPlayMusic(id, url)"
        v-for="{id, name, url} in musicList"
        class="musicItem__wr"
    >
      <audio @onended="onEndedCheck" :id='"track-" + id'>
        <source :src="url" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
      <div class="musicItem__name">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<style src="./styles.scss" lang="scss" />
