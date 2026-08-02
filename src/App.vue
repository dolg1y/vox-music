<script setup lang="ts">

import PlayBar from '@/components/play-bar/index.vue'
import musicList from '@/components/music-list/index.vue'
import {onMounted} from "vue";
import { CashOutline as CashIcon } from '@vicons/ionicons5'

onMounted(() => {
  document.querySelector('.main-wr').style.setProperty('--play-bar-height', '106px')
})

</script>

<template>
  <div class="main-wr">
    <musicList />
    <PlayBar />
  </div>
</template>

<style src="./assets/scss/main.scss" lang="scss" />
