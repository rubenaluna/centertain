import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Vue3ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import App from './App.vue'
import Home from './views/Home.vue'

const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Vue3ColorPicker)

app.mount('#app')
