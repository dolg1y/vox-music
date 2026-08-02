<script setup lang="ts">

import { music } from "@/store/pinia/music/index.js"
import {onMounted, ref, watch} from "vue"
import { changeVolume } from "@/store/helpers/audioSettings";

const isPlaying = ref(false)

const clickMusic = (id: number = null, url: string = null) => {
  if(!id) {
    return
  }

  if(!isPlaying.value) {
    music().setActiveMusic(id, url)
    music().getAudio.play()
    isPlaying.value = true
    changeVolume()

    return
  }

  if(id === music().getActiveMusic.id) {
    music().getAudio.pause()
    isPlaying.value = false

    return
  }

  isPlaying.value = true
  music().getAudio.pause()
  music().getAudio.currentTime = 0
  music().setActiveMusic(id, url)
  music().getAudio.play()
  changeVolume()
}

// watch(music().getActiveMusic.id, (newChecked: boolean, oldChecked: boolean) => {
//   if(newChecked !== oldChecked && music().getButtonRepeat) {
//     music().getAudio.currentTime = 0
//     music().getAudio.play()
//   }
// })

onMounted(() => {
  music().fetchDataMusic()
})

</script>

<template>
  <div class="music-list">
    <div
        @click="clickMusic(id, url)"
        v-for="{ id, name, url } in music().getMusicList"
        class="music-list__wrapper"
    >
      <div class="music-list__name">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<style src="./styles.scss" lang="scss" />
