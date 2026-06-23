<script setup lang="ts">

import { music } from "@/store/pinia/music/index.js"
import { onMounted, ref } from "vue"

const isPlaying = ref(false)

console.log(isPlaying.value)

const clickMusic = (id: number = null, url: string = null) => {
  if(!id) {
    return
  }

  if(!isPlaying.value) {
    music().setActiveMusic(id, url)
    music().getActiveTrack.play()
    isPlaying.value = true
    changeVolume()

    return
  }

  if(id === music().getActiveMusic.id) {
    music().getActiveTrack.pause()
    isPlaying.value = false

    return
  }

  isPlaying.value = true
  music().getActiveTrack.pause()
  music().getActiveTrack.currentTime = 0
  music().setActiveMusic(id, url)
  music().getActiveTrack.play()
  changeVolume()
}

// const onEndedCheck = () => {
//   if(music().getButtonRepeat) {
//     changeTimeAndPlay()
//   }
// }

const changeVolume = () => {
  const volume = document.getElementById('volume') as HTMLInputElement

  music().getActiveTrack.volume = +volume.value / 100
}

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
