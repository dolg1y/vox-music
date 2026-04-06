<script setup>
import musicItem from './music-item/index.vue'

import { music } from '@/store/pinia/music/index.ts'
const musicList = music().getMusicList
</script>

<template>
  <div>
    <musicItem v-for="index in musicList" />
  </div>
</template>

<style src="./styles.scss" lang="scss" />
