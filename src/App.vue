<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import MapBox from './components/MapBox.vue'
</script>

<template>
  <aside>
    <Header class="mobile" />
    <div class="wrapper">
      <MapBox />
    </div>
  </aside>
  <main>
    <Header class="desktop" />
    <section>
      <div id="overlay"></div>
      <RouterView />
    </section>
  </main>
</template>

<style scoped lang="scss">
@import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
aside {
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1.5;
  max-height: 100vh;
  height: 40%;
  .wrapper {
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 1024px) {
  .mobile {
    display: initial;
  }
  .desktop {
    display: none;
  }
}
@media (min-width: 1024px) {
  .mobile {
    display: none;
  }
  .desktop {
    display: initial;
  }
  main {
    height: 100%;
  }
}

main {
  min-height: 60%;
  display: flex;
  flex-direction: column;
  margin: auto 0;
  justify-content: center;
  section {
    flex-grow: 1;
    display: flex;
    align-items: center;
    position: relative;
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
      cursor: pointer;
      @media (max-width: 1024px) {
        display: none;
      }
    }
  }
  @media (min-width: 1024px) {
    height: 100%;
  }
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  aside {
    display: flex;
    place-items: center;
    height: auto;
    .wrapper {
      display: flex;
      margin-left: auto;
      place-items: flex-end;
      flex-wrap: wrap;
    }
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
