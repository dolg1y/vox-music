<script setup>
import PlayBar from '@/components/play-bar/index.vue'
import musicList from '@/components/music-list/index.vue'

import { player } from '@/store/pinia/player/index.ts'
import { music } from '@/store/pinia/music/index.ts'
</script>

<template>
  <div class="main-wr">
    <musicList />
    <PlayBar />
  </div>

  {{ music().getMusicList }}
</template>

<style src="./assets/scss/main.scss" lang="scss" />
