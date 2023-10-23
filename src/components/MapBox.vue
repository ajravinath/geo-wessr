<template>
  <div id="map" class="map"></div>
</template>

<script setup lang="ts">
import { useLocationStore } from '@/stores/counter';
import type { Map, MapOptions } from 'leaflet';
import * as L from 'leaflet';
import { onMounted, ref, watch, type Ref } from 'vue';

const store = useLocationStore();

const userControlsDisabled = {
  keyboard: false,
  tap: false,
  dragging: false,
  touchZoom: false,
  zoomControl: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  boxZoom: false,
  attributionControl: false
};

const map: Ref<Map | null> = ref(null);
onMounted(() => {
  let config: MapOptions = {
    minZoom: 5,
    maxZoom: 18,
    ...userControlsDisabled
  };

  if (document && document.getElementById('map')) {
    document.getElementById('map')!.style.cursor = 'default';
  }

  const zoom = 1;

  map.value = L.map('map', config).setView(store.latLng as L.LatLngExpression, zoom);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value);
});

watch(
  () => store.latLng,
  () => {
    if (map.value) {
      map.value.invalidateSize();
      map.value.flyTo(store.latLng as L.LatLngExpression, 5);
    }
  }
);
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
