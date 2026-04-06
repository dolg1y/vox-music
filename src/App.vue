<script setup>
import PlayBar from '@/components/play-bar/index.vue'
import musicList from '@/components/music-list/music-item/index.vue'
import { music } from "@/store/pinia/music/index.js";
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia"

const musicStore = music()

const { getMusicList } = storeToRefs(music())

onMounted(() => {
  musicStore.fetchDataMusic()
})
</script>

<template>
  <div class="main-wr">
    <musicList :musicList="getMusicList" />
    <PlayBar :musicList="getMusicList" />
  </div>
</template>

<style src="./assets/scss/main.scss" lang="scss" />
