import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import naive from 'naive-ui'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(naive)
app.mount('#app')