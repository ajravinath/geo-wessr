<script setup lang="ts">
defineProps({
  isWon: { type: Boolean }
})
</script>

<template>
  <h1 v-if="isWon">🎉 Won 🎉</h1>
  <h1 v-else>😭 Oh noo.. you lost 😭</h1>
</template>

<style scoped lang="scss"></style>
