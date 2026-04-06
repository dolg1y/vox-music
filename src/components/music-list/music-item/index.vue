<script setup>

import { music } from "@/store/pinia/music/index.js";
import {ref} from "vue";

const isPlaying = ref(false)

defineProps({
  musicList: Object,
})

// TODO: Название странное
const onPlayMusic = (id) => {
  // TODO: А если id не передали?) или там оказалась не сторока?

  // TODO: Опять вопрос с ref и кеширвоанием дом элемента. Вед вызывая каждый раз getElementById ты заставляешь браузер проводить перерасчеты
  // TODO: Аналогичная история и с модулем music. Его стоит закешировать в переменную и уже ее использовать
  const audioNow = document.getElementById(`track-${music().getActiveMusic?.id}`)
  // TODO: Еще вопрос. Для чего ты объявил в самом верху константу audioNow, если она исполбзуется в самом низу?
  // Это конечно микро оптимизации, НО лучше объевзять константы ближе к тому месту где она испольузется.
  // Особенн оесли у тебя есть if, из-за которых до куска кода где ты работаешь с audioNow может вообще не дойти выполннеие

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
  // TODO: Тут тоже. Для чего объявил вверху. У тебя велик шанс что if не выполнится, соответственно память засрется лишней константой
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
      <!-- TODO: id можно перенести в компьютед -->
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
