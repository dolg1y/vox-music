<script setup>
// TODO: Есть мелки пробелмы с отступами, точками с запятой
import PlayBar from '@/components/play-bar/index.vue'
import musicList from '@/components/music-list/music-item/index.vue'
import { music } from "@/store/pinia/music/index.js";

// TODO: watch не используется
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia"

// TODO: По идее, работу со стейт менеджером можно изолировать внутри компонентов.
// ТЕ. Если к примеру тебе нужны только списки песен, логично их доставить из стейт менеджера и использовать только там где это нужно.
// Вот в данном случае в компоненте App.vue как будто бы и не нужно использовать модуль pinia.
// Я предлагаю перенести использование уже в сами компоненты

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
