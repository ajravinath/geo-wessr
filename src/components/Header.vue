<script setup lang="ts">
import { TransitionGroup } from 'vue'
const weatherSentences = [
  "The sun's tender kiss melts away the morning frost, and the world awakens with a blush of warmth. 🌄❄️",
  "Raindrops fall like nature's tears, refreshing the earth's thirst and painting the world in liquid poetry. 🌧️🌿",
  'A gentle breeze whispers secrets of distant lands, carrying the scent of adventure in the air. 🌬️🌍',
  'Snowflakes, like delicate dancers, twirl and pirouette, turning the world into a shimmering ballet of wonder. ❄️❄️❄️',
  'Thunder rumbles in the distance, the orchestra of a summer storm, while lightning illuminates the sky in a brilliant, fleeting dance. ⚡🌩️',
  'The moon emerges, a silvery crescent in the indigo night, as stars gather to witness the dreams of slumbering souls. 🌙✨',
  'Morning fog wraps the world in a soft, mystical embrace, concealing and revealing secrets with every step. 🌫️🍃',
  'The rainbow arches across the sky, a bridge of hope painted with the colors of promise after the rain. 🌈🌦️',
  'A sandstorm swirls, a symphony of golden grains, where the desert tells its ancient tales in the shifting dunes. 🏜️🌪️',
  'The autumn leaves fall like whispered confessions, carpeting the ground in shades of nostalgia. 🍁🍂'
]
</script>
<template>
  <header>
    <div id="box">
      <h1>
        <TransitionGroup class="result">
          <span>🌏</span>
        </TransitionGroup>
        Geo Wessr
      </h1>
    </div>
    <div class="shadow"></div>
  </header>
</template>
<style scoped lang="scss">
header {
  position: relative;
  #box {
    z-index: 100;
    position: relative;
    width: 90%;
    background-color: white;
    margin: auto;
    border-bottom: 1px solid rgba(128, 128, 128, 0.465);
    h1 {
      position: relative;
      font-size: xx-large;
      font-family: monospace;
      padding: 0.6rem 1rem 0.4rem 0.4rem;
    }
    @media (max-width: 1024px) {
      width: 100%;
      h1 {
        padding: 0.6rem 1rem 0.5rem 1rem;
      }
    }
  }

  .shadow {
    top: 99%;
    left: 5%;
    height: 1px;
    width: 90%;
    margin: auto;
    z-index: -1;
    position: absolute;
    box-shadow: 0px 1px 4px rgba(195, 188, 188, 0.677);
    @media (max-width: 1024px) {
      width: 100%;
    }
  }
  flex-grow: 0;
}
</style>
