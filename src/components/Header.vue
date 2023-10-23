<script setup lang="ts">
import { TransitionGroup } from 'vue';
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
];
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
    <div id="overlay"></div>
  </header>
</template>
<style scoped lang="scss">
#overlay {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  @media (max-width: 1024px) {
    display: none;
  }
}
header {
  position: relative;
  padding: 0rem 2rem;
  #box {
    z-index: 100;
    position: relative;
    width: 100%;
    background-color: white;
    margin: auto;
    border-radius: 0rem 0rem 1rem 1rem;
    box-shadow: 0px 1px 4px 3px rgba(21, 21, 21, 0.27);
    h1 {
      position: relative;
      font-size: xx-large;
      font-family: monospace;
      padding: 0.5rem 1rem 0.5rem 1.5rem;
    }
  }
  @media (max-width: 1024px) {
    #box {
      z-index: 450;
      width: 100%;
      left: 0;
      position: fixed;
      h1 {
        padding: 0.6rem 1rem 0.5rem 1rem;
      }
    }
  }

  flex-grow: 0;
}
</style>
