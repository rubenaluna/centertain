<script setup lang="ts">
import type { Point } from '@/models/geo'
import { useStore } from '@/state/store'
import { LngLatBounds, Map, Marker } from 'maplibre-gl'
import {
  markRaw,
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  shallowRef,
  watch,
} from 'vue'

const container = shallowRef<HTMLElement | undefined>()
const map = shallowRef<Map | undefined>()
const position = ref<Point | undefined>()
const { friends } = useStore()
const markers = reactive<Record<string, Marker>>({})

onBeforeMount(() => {
  if (navigator.geolocation != null) {
    navigator.geolocation.getCurrentPosition((current) => {
      position.value = { latitude: current.coords.latitude, longitude: current.coords.longitude }
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
      center: position.value ? [position.value.longitude, position.value.latitude] : [0, 0],
      zoom: position.value ? 15 : 2,
      attributionControl: false,
    }),
  )
  map.value.setPadding({ left: 350 })
})

watch(position, (updated) => {
  if (updated) {
    map.value?.setCenter([updated.longitude, updated.latitude])
    map.value?.setZoom(11)
  }
})

watch(friends, (updated) => {
  if (map.value) {
    Object.entries(markers).forEach(([id, marker]) => {
      marker.remove()
      delete markers[id]
    })

    const bounds = new LngLatBounds()
    updated.forEach((friend, id) => {
      if (friend.position) {
        const marker = new Marker({ color: friend.color })

        marker.setLngLat([friend.position.longitude, friend.position.latitude])
        marker.addTo(map.value!)
        markers[id] = marker

        bounds.extend(marker.getLngLat())
      }
    })

    map.value.fitBounds(bounds, { padding: 100, maxZoom: 17 })
  }
})

onUnmounted(() => {
  map.value?.remove()
})
</script>

<template>
  <div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark"
      ><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"
    /></a>
    <div class="map" ref="container"></div>
  </div>
</template>

<style>
@import 'maplibre-gl/dist/maplibre-gl.css';

.map-wrap {
  position: absolute;
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

.mapboxgl-marker {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: lightblue;
}
</style>
