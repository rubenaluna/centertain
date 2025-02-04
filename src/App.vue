<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
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
  height: 100%;
}
</style>
