<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <main>
    <Navbar />
    <RouterView class="View" />
  </main>
</template>

<style>
main {
  display: block;
  width: 100%;
  height: 100vh;
}
.View {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
