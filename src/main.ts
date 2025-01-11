import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import App from './App.vue'

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

app.mount('#app')
