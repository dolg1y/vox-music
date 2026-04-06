<script setup>
import { music } from "@/store/pinia/music/index.js";
// TODO: watch не использутся. Есть лишние ";". Или ли не лишние? Если нет то расставляй их везде.
// Стилизация компонентов и кода в проекте должна быть одинаковая
import {computed, ref, watch} from "vue";

defineProps({
  music: Object,
})

const isPlaying = ref(false)

const activeMusic = music()

// TODO: Не забывай что какие то строки лучше выносить в константы. Вдруг ты захочешь(или я предложу) добавить английский язык?)

const nameTrack = computed(() => activeMusic.getActiveMusic?.name || 'Не указано')
const textRepeat = computed(() => {
  // TODO: Для простоты чтения кода, лучше не использовать if+else. Вспомни как мы это делаем на работе(используем return)

   if(activeMusic.getRepeatMusic) {
     return 'repeat'
   } else {
     return 'no-repeat'
   }
})

// TODO: Назание странное. Мы что то пытаемся установить?)
// может просто prevMusic и nextMusic?
const setPrevMusic = () => {
  // TODO: Почему выше ты используетшь activeMusic
  // а тут уже music()??
  // приведи код к одному виду. Вижу что ты тут торопился когда писал..


  // TODO: Забыл про ref?)
  const audioNow = document.getElementById(`track-${music().getActiveMusic.id}`)

  // TODO: Бывает так что у пользователя заблокирован плеер на компе по той или иной причине. Либо он не отрендерился..
  // лучше доабвить условие на проверку появился ли вообще тег play и есть ли в нем все что нужно
  if (music().getActiveMusic.id <= 0) {
    audioNow.currentTime = 0
    audioNow.play()

    return
  }

  // TODO: Забыл про ref?)
  const audioPrev = document.getElementById(`track-${music().getActiveMusic.id - 1}`)
  audioNow.pause()

  // TODO: Вижу похожие блоки кода. Почему бы не объеденить их в функции?
  audioNow.currentTime = 0
  audioPrev.play()

  music().setActiveMusic(music().getActiveMusic.id - 1)
  changeVolume()
};

const setPlayPauseMusic = () => {
  const audio = document.getElementById(`track-${music().getActiveMusic.id}`)

  if(!isPlaying.value) {
    // TODO: Вот опять таки. Тут у тебя почему то есть ?. для запуска метода pause, а в дургих местах нет.
    audio?.pause()
    isPlaying.value = true
    // TODO: видимо это лишнее
    console.log(audio)

    return
  }

  audio?.play()
  isPlaying.value = false
  changeVolume()
}

const setNextMusic = () => {
  // TODO: Для чего каждый раз получать из дом дерева элемент, это не самое оптимальон рещение.
  // Закешируй ег ов переменную выше и используй уже ее. Это для всех методов вопрос
  const audioNow = document.getElementById(`track-${music().getActiveMusic.id}`)

  if (music().getActiveMusic.id + 1 >= music().getMusicList.length) {
    music().setActiveMusic(0)
    audioNow.currentTime = 0
    audioNow.volume = 20
    audioNow.play()

    return
  }

  const audioNext = document.getElementById(`track-${music().getActiveMusic.id + 1}`)
  audioNow.pause()
  audioNow.currentTime = 0
  audioNext.play()

  music().setActiveMusic(music().getActiveMusic.id + 1)
  changeVolume()
}

const changeVolume = () => {
  const audioNow = document.getElementById(`track-${music().getActiveMusic.id}`)
  const volume = document.getElementById('volume')

  audioNow.volume = volume.value / 100
}

const repeatMusic = () => {
  activeMusic.setRepeatMusic()

  console.log(activeMusic.getRepeatMusic)
}
</script>

<template>
  <!-- TODO: ref есть. Но не используется... -->
  <div class="play-bar" ref="playbar">
    <div class="play-bar__name">
      <img src="" alt="">
      <div class="play-bar__name-text">
        <p>{{ nameTrack }}</p>
      </div>
    </div>
    <div class="play-bar__record-player">
        <!-- TODO: Можно же передать метод без () -->
        <button @click="setPrevMusic()">prev</button>
        <button type="button" @click="setPlayPauseMusic()">play</button>
        <button @click="setNextMusic()">next</button>
    </div>
    <div>
      <button @click="repeatMusic">{{ textRepeat }}</button>
    </div>
    <!-- TODO: А чего не стал оборачивать input в label? -->
    <div class="play-bar__volume">
      <input @change="changeVolume" type="range" id="volume" name="volume" value="100" min="0" max="100" />
      <label for="volume">Volume</label>
    </div>
  </div>
</template>

<style src="./styles.scss" lang="scss" />
