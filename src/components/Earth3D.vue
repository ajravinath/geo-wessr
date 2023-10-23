<script setup lang="ts">
import { ref, watchEffect, type Ref, onMounted } from 'vue';

import earthBump from '@/assets/textures/earth-bump.jpg';
import earthSpec from '@/assets/textures/earth-spec.jpg';
import earth from '@/assets/textures/earth.jpg';
import { useMediaQuery } from '@/composables/useMediaQuery';
import type { Renderer as RendererType, Sphere as SphereType } from 'troisjs';
import {
  AmbientLight,
  Camera,
  PointLight,
  Renderer,
  Scene,
  Sphere,
  StandardMaterial,
  Texture
} from 'troisjs';

const isLargeScreen = useMediaQuery('(min-width: 1024px)');
const renderer: Ref<Nullable<typeof RendererType>> = ref(null);
const sphere: Ref<Nullable<typeof SphereType>> = ref(null);

onMounted(() => {
  const threeRenderer = renderer.value;
  const threeSphere = sphere.value;
  if (isLargeScreen.value) {
    threeRenderer?.onBeforeRender(() => {
      if (threeSphere) {
        threeSphere.mesh.rotation.y += 0.001;
      }
    });
  }
});
</script>

<template>
  <Renderer
    v-if="isLargeScreen"
    ref="renderer"
    class="canvas"
    resize
    antialias
    :alpha="true"
    :orbit-ctrl="{ autoRotate: false, enableDamping: true, dampingFactor: 0.05 }"
  >
    <Camera :position="{ y: 0, x: 0, z: -10 }" />
    <Scene background="#00FFFFFF">
      <AmbientLight :intensity="0.9" />
      <PointLight :position="{ y: 50, z: 0 }" :intensity="0.75" />
      <PointLight color="#ff6000" :intensity="0.75" />
      <Sphere
        :position="{ y: -1, x: -2 }"
        ref="sphere"
        :radius="4.6"
        :width-segments="200"
        :height-segments="200"
      >
        <StandardMaterial :props="{ displacementScale: 0.2 }">
          <Texture :src="earth" name="map" />
          <Texture :src="earthBump" name="bumpMap" />
          <Texture :src="earthSpec" name="specMap" />
        </StandardMaterial>
      </Sphere>
    </Scene>
  </Renderer>
</template>

<style global lang="scss">
.canvas {
  right: 0;
  bottom: 0;
  width: 600px;
  overflow: hidden;
  z-index: -10;
  position: absolute;
}
</style>
