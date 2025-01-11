<template>
  <div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark"
      ><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"
    /></a>
    <div class="map" ref="container"></div>
  </div>
</template>

<script lang="ts">
import { Map } from 'maplibre-gl'
import { shallowRef, onMounted, onUnmounted, markRaw, reactive, onBeforeMount, watch } from 'vue'

export default {
  name: 'Map',

  setup() {
    const container = shallowRef<HTMLElement | null>(null)
    const map = shallowRef<Map | null>(null)
    const position = reactive({ lng: -74.0054338, lat: 40.7124804 })

    onBeforeMount(() => {
      if (navigator.geolocation != null) {
        navigator.geolocation.getCurrentPosition((current) => {
          position.lat = current.coords.latitude
          position.lng = current.coords.longitude
        })
      }
    })

    onMounted(() => {
      if (!container.value) {
        return
      }

      const apiKey = import.meta.env.VITE_MAPTILER_API_KEY

      map.value = markRaw(
        new Map({
          container: container.value,
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
          center: [position.lng, position.lat],
          zoom: 13,
          attributionControl: false,
        }),
      )
    })

    watch(position, (updated) => {
      map.value?.setCenter([updated.lng, updated.lat])
    })

    onUnmounted(() => {
      map.value?.remove()
    })

    return {
      map,
      container,
    }
  },
}
</script>

<style scoped>
@import 'maplibre-gl/dist/maplibre-gl.css';

.map-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>
