import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', () => {
  const lng = ref(0)
  const lat = ref(0)
  const latLng = computed(() => {
    return [lat.value, lng.value]
  })
  function setLatLng(latitude: number, longitude: number) {
    lat.value = latitude
    lng.value = longitude
  }

  return { latLng, setLatLng }
})
